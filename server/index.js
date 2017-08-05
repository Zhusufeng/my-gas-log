var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql= require('mysql');

var db = mysql.createConnection({
  user: 'root',
  password: 'root',
});

db.connect(function(err) {
  if (err) {
    console.log('You have an error connecting to the db: ', err);
  }
  console.log('!!! Connected to MySQL !!!');

  if (!db.database) {
    console.log('Database mygaslog does not exist');

    var createDB = "CREATE DATABASE mygaslog";

    db.query(createDB, function(err, result) {
      if (err) {
        console.log('Did not create database mygaslog. Error is ', err);
      }
      console.log('Database mygaslog created');
    });

  } else {
    console.log('Database named mygaslog is connected');
  }



});

// Parse application/json files
app.use(bodyParser.json());

// Parse text files
// app.use(bodyParser.text());

// Serve static file
app.use(express.static('compiled/client'));

// Basic GET to /
app.get('/', function(req, res) {
  res.send('Hello you did a GET request');
});

// Basic POST to /
app.post('/', function(req, res) {
  res.status(201).send(req.body);
});

// Basic POST to /post
app.post('/post', function(req, res) {
  // Express body-parser
  console.log('POSTED. Server side says success: ', req.body);
  res.status(201).send(req.body);

});

// Ensure server is listening
app.listen(8080, function() {
  console.log('My Gas Log server listening on port 8080');
});