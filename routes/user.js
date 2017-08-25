const express = require("express");
const router = express.Router();
const Robot = require("../models/robot");
const mongoose =require("mongoose");

mongoose.connect("mongodb://localhost:27017/robots");



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
    passwordHash: req.body.password,
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
