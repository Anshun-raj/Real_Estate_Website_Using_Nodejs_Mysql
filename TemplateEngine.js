const express = require("express");
const router = express.Router();
var con = require("./MySql");
const checkUrl = function (req, res, next) {
  console.log("current route is", req.originalUrl);
  next();
};
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
const app = express();

app.set("view engine", "ejs");

app.use("/assets", express.static("assets"));

router.get("/", checkUrl, function (req, res) {
  res.render("Home");
});

router.get("/home", checkUrl, function (req, res) {
  res.render("Home");
});

router.get("/about", checkUrl, function (req, res) {
  res.render("About");
});

router.get("/agents", checkUrl, function (req, res) {
  res.render("Agents");
});

router.get("/property", checkUrl, function (req, res) {
  res.render("Property");
});

router.get("/contact", checkUrl, function (req, res) {
  res.render("Contact");
});

router.post("/contact", encoder, checkUrl, function (req, res) {
  console.log(req.body);
  var name = req.body.name;
  var email = req.body.email;
  var city = req.body.city;
  var age = req.body.age;
  var msg = req.body.msg;
  con.connect(function (err) {
    if (err) throw err;

    var sql =
      "INSERT INTO info(name,email,city,age,msg) VALUES('" +
      name +
      "','" +
      email +
      "','" +
      city +
      "','" +
      age +
      "','" +
      msg +
      "')";
    var data = "SELECT * from info";
    con.query(sql, function (err, res1) {
      if (err) throw err;
      res.send("Data stored successfully ");
    });
    con.query(data, function (err, res2) {
      if (err) throw err;
      console.log(res2);
    });
  });
});

app.use("/", router);
app.listen(4000);
