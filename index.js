const Data = require("./models/data.js");
const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require("path");
const router = require("./routes/user")
const app = express();

// app.use('/project', express.static(path.join(__dirname, '/project')))

app.use("/public", express.static("public"));

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(router);





app.listen(3000, function () {
  console.log('Successfully started express application!');
})
