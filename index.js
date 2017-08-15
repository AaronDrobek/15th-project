const data = require("data.js")
const express = require('express');
const app = express();

app.use("/public", express.static('public'));
