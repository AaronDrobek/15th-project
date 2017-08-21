const express = require("express");
const router = express.Router();
const Data = require('../models/data.js')




router.get('/', function (req, res) {
    console.log(Data.allUsers);
    res.render('index', {users: Data.allUsers});
})


router.get('/listing/:id', function (req, res) {
  let id = req.params.id;
  // let user = data.users[req.params.id-1];
  let user = Data.allUsers.find(function(user){
      return user.id == id;
  });

  res.render('listing', user );


})







module.exports = router;
