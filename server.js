"use strict";

// load package
const express = require("express");
const app = express();
const fs = require("fs");
var cors = require("cors");
var http = require("http");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const axios = require("axios");

var mysql = require("mysql");
const { urlencoded } = require("body-parser");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "database",
});

const PORT = 3007;
const HOST = "localhost";

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/greeting", (req, res) => {
  res.send("hello ralph 1 2 3");
});

app.get("/connect", (req, res) => {
  con.connect(function (err) {
    if (err) console.log("oops");
    console.log("Connected!");
  });

  res.send("ok");
});

app.get("/end", (req, res) => {
  con.end(function (err) {
    if (err) console.log(err);
    console.log("off");
  });

  res.send("ok");
});

app.get("/create", (req, res) => {
  var sql =
    "CREATE TABLE data (ID int NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50), choices VARCHAR(200), time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, size TEXT, status VARCHAR(50))";
  con.query(sql, function (err) {
    if (err) throw err;
  });

  res.send("ok");
});

app.post("/insert", (req, res) => {
  var name = req.body.firstname;
  var choices = req.body.choice;
  var size = req.body.Size;
  var status = "Active";

  // (function (err) {
  //   if (err) throw err;
    var sql =
      "INSERT INTO data (name, choices, size, status) VALUES ('" +
      name +
      "','" +
      choices +
      "', '" +
      size +
      "', '" +
      status +
      "')";

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  // });
  res.sendFile("/Users/2018firstsem/Desktop/coffee/public/index.html");

});

app.get("/select", (req, res) => {
 
    con.query("SELECT * FROM data", function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  });

  app.get("/select1", (req, res) => {
    
      var sql = `SELECT * FROM data ORDER BY time ASC`;

      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record deleted");
      });

      res.redirect("/");
  
  });

  app.post("/update", function (req, res) {
    let n = req.body.firstname;

    
    var sql = `UPDATE data SET status = 'ready' WHERE name = '${n}'`;

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record deleted");
    });
    res.redirect("/");

});

  app.post("/delete", function (req, res) {
    let n = req.body.firstname;

    var sql = `DELETE FROM data WHERE name = '${n}'`;

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record deleted");
    });
    res.redirect("/");

});

app.listen(PORT, HOST);
