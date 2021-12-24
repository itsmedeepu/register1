const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/register");
var db = mongoose.connection;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/login", function (req, res) {
  var email = req.body.email;
  var pass = req.body.password;

  var data = {
    email: email,
    password: pass,
  };
  db.collection("register").insertOne(data, function (err, collection) {
    if (err) throw err;
    res.send('<script>alert("Record inserted Successfully")</script>');
  });
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/static/index.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/static/login.html");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
