const data = require("./data.js");
const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require("path");
const app = express();

// app.use('/project', express.static(path.join(__dirname, '/project')))

app.use("/public", express.static("public"));

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');



app.get('/', function (req, res) {

    res.render('index', data);
})


app.get('/listing/:id', function (req, res) {

  let user = data.users.[req.params.id[-1]];

  res.render('listing',  user);


})



app.listen(3000, function () {
  console.log('Successfully started express application!');
})
