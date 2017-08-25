const express = require("express");
const router = express.Router();
const Robot = require("../models/robot");
const mongoose =require("mongoose");
const passport = require('passport');

mongoose.connect("mongodb://localhost:27017/robots");


const requireLogin = function (req, res, next) {
  if (req.user) {
    console.log(req.user)
    next()
  } else {
    res.redirect('/login');
  }
};

const login = function (req, res, next) {
  if (req.user) {
    res.redirect("/listing")
  } else {
    next();
  }
};

router.get("/", login, function(req, res) {
  res.render("login", {
    messages: res.locals.getMessages()
  });
});


router.get("/edit", login, function(req, res) {


  res.render("edit", {
      messages: res.locals.getMessages()
  });
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/listing',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get("/signup", function(req, res) {
  res.render("signup");
});

// router.post("/signup", function(req, res) {
//   User.create({
//     username: req.body.username,
//     password: req.body.password
//   }).then(function(data) {
//     console.log(data);
//     res.redirect("/");
//   })
//   .catch(function(err) {
//     console.log(err);
//     res.redirect("/signup");
//   });
// });
//
// router.get("/user", requireLogin, function(req, res) {
//   res.render("user", {username: req.user.username});
// });
//
// router.get("/logout", function(req, res) {
//   req.logout();
//   res.redirect("/");
// });
//

router.get('/allUsers', function (req, res) {
  Robot.find({}).sort("name")
  .then(function(users) {
    data = users
    res.render('allUsers', {users: users});
  })
  .catch(function(err) {
    console.log(err);
    next(err);
  })
});


router.get('/listing/:id',function (req, res) {
  Robot.find({_id: req.params.id})
  .then(function(user) {
    console.log(user);
    res.render('listing', {users: user} );
  })
  .catch(function(err) {
    console.log(err);
    next(err);
  })
});


router.get("/looking/:job", function (req, res){
  if (req.params.job === "unemployed") {
    Robot.find({job: null})
    .then(function(users) {
      res.render('looking', {users: users} );
    })
    .catch(function(err) {
      console.log(err);
      next(err);
    })
  } else {
    let data = []
    Robot.find({})
    .then(function(users) {
      for (var i = 0; i < users.length; i++) {
        if (users[i].job){
          data.push(users[i])
        }
      }
      res.render("employed", {users: data})
    })
      .catch(function(err) {
        console.log(err);
        next(err);
      })

  }
})
//start new code
router.post('/go_to_signup',function (req, res) {
  // Robot.find({})
  // .then(function(user) {
  //   console.log(user);
    res.render("signup");
  // })
  // .catch(function(err) {
  //   console.log(err);
  //   next(err);
  // })
});



router.get('/',function (req, res) {
  Robot.find({_id: req.params.id})
  .then(function(user) {
    console.log(user);
    res.render('login', {users: user} );
  })
  .catch(function(err) {
    console.log(err);
    next(err);
  })
});

router.post("/signup", function(req, res){
  Robot.create({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    avatar: req.body.avatar,
    email: req.body.email,
    university: req.body.university,
    job: req.body.job,
    company: req.body.company,
    skills: req.body.skills,
    phone: req.body.phone,
    address: {
      street_num: req.body.street_num,
      street_name: req.body.stree_name,
      city: req.body.city,
      state_or_province: req.body.state_or_province,
      postal_code: req.body.postal_code,
      country: req.body.country
    }
  })
    .then(function(data){
      console.log(data);
      res.redirect('/')
    })
    .catch(function(err){
      console.log(err);
    })
  })






module.exports=router;
