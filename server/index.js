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
    console.log('ERR!: Error connecting to the db. Error: ', err);
  }
  console.log('YAY!: Connected to MySQL');

  // Database not specified
  if (!db.database) {

    // Specify database
    var useDB = "USE mygaslog";

    db.query(useDB, function(err, result) {
      if (err) {
        console.log('ERR!: Error in using mygaslog database. Error: ', err);

        // Create database if error in using database
        var createDB = "CREATE DATABASE mygaslog";

        db.query(createDB, function(err, result) {
          if (err) {
            console.log('ERR!: Error in creating database mygaslog. Error: ', err);
          }
          console.log('YAY!: Database mygaslog created');
        });
      }

      console.log('YAY!: Using database mygaslog');
    });

  } else {
    console.log('YAY!: Database named mygaslog is connected');
  }

  // Specify table to use
  var showTable = "SHOW TABLES FROM mygaslog LIKE 'gaslog'";

  db.query(showTable, function(err, result) {
    if (err) {
      console.log('ERR!: Error in showing table gaslog. Error: ', err);
    }
    console.log('YAY!: ShowTable: ', result);

    // Create Table
    if (result.length === 0) {
      var createTable = "CREATE TABLE gaslog (ID INT NOT NULL AUTO_INCREMENT, created DATETIME DEFAULT CURRENT_TIMESTAMP, pmileage INT NOT NULL, cmileage INT NOT NULL, gallons INT NOT NULL, price DOUBLE(10,2) NOT NULL, mpg DOUBLE(10,2) NOT NULL, total DOUBLE(10,2) NOT NULL, PRIMARY KEY(ID))";

      db.query(createTable, function(err, result) {
        if (err) {
          console.log('ERR!: Error in creating table gaslog. Error: ', err);
        }
        console.log('YAY!: CreateTable: ', result);
      });
    }
  });
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