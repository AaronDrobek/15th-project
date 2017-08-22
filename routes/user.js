const express = require("express");
const router = express.Router();
let data = [];

const getLayout = function(req, res, next) {
    let MongoClient = require("mongodb").MongoClient;
    let assert = require("assert");

    let url = "mongodb://localhost:27017/robots";
    MongoClient.connect(url, function(err, db){
      assert.equal(null, err);

      getData(db, function(){
        db.close();
        next();
      });
    });

    let getData = function(db, callback){
      let users = db.collection("users");

      users.find({}).toArray().then(function(users){
          data = users;
          console.log("this is email", data[0].email);
          callback();
      });

    };
};
const getListings = function(req, res, next) {
    let MongoClient = require("mongodb").MongoClient;
    let assert = require("assert");

    let url = "mongodb://localhost:27017/robots";
    MongoClient.connect(url, function(err, db){
      assert.equal(null, err);

      getData(db, function(){
        db.close();
        next();
      });
    });

    let getData = function(db, callback){
      let users = db.collection("users");
      users.find({id: Number(req.params.id)}).toArray().then(function(users){
        console.log(users);
          data = users;
          console.log(data);
          callback();
      });

    };
};

const getUnEmployed = function(req, res, next) {
    let MongoClient = require("mongodb").MongoClient;
    let assert = require("assert");

    let url = "mongodb://localhost:27017/robots";
    MongoClient.connect(url, function(err, db){
      assert.equal(null, err);

      getData(db, function(){
        db.close();
        next();
      });
    });

    let getData = function(db, callback){
      let users = db.collection("users");

      users.find({}).toArray().then(function(users){
          data = []
          let jobSearch = false;
          if (req.params.job === "employed") {
            jobSearch = true;
          }
          for (var i = 0; i < users.length; i++) {
            if (jobSearch) {
              if (users[i].job) {
                data.push(users[i]);
              }
            } else {
              if (!users[i].job) {
                data.push(users[i]);
              }
            }
          }
          // console.log("unemployed",users);

          callback();
      });

    };
};

// const getListings = function(req, res, next) {
//     let MongoClient = require("mongodb").MongoClient;
//     let assert = require("assert");
//
//     let url = "mongodb://localhost:27017/robots";
//     MongoClient.connect(url, function(err, db){
//       assert.equal(null, err);
//
//       getData(db, function(){
//         db.close();
//         next();
//       });
//     });
//
//     let getData = function(db, callback){
//       let users = db.collection("users");
//
//       users.find({}).toArray().then(function(users){
//           data = users;
//           callback();
//       });
//
//     };
// };

router.get('/', getLayout, function (req, res) {
    res.render('allUsers', {users: data});
})



router.get('/listing/:id', getListings, function (req, res) {
  // let id = req.params.id;
  // let user = data.find(function(user){
  //     return user.id == id;
  // });
console.log(data);
  res.render('listing', {users: data} );


})

// router.get("/employed", getEmployed, function (req, res){
// res.render("employed", {users: data});
// })

router.get("/looking/:job", getUnEmployed, function (req, res){
  if (data[0].job === null){
    res.render("looking", {users: data})
  }else {
    res.render("employed", {users: data})
  }
})






module.exports = router;
