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
  res.status(200).send('GET: Hello you did a GET request');
});

// GET to /post which queries DB
app.get('/post', function(req, res) {
  var getAll = "SELECT * FROM gaslog";

  db.query(getAll, function(err, result) {
    if (err) {
      console.log('ERR!: GET error: ', err);
    }
    console.log(result);
    res.status(200).send(result);
  });
});

// Basic POST to /
app.post('/', function(req, res) {
  // Test posting to DB with Postman
  var exampleQuery = "INSERT INTO gaslog(pmileage, cmileage, gallons, price, mpg, total) VALUES (?,?,?,?,?,?)";
  db.query(exampleQuery, [500, 1000, 15, 2.59, 33.33, 38.85],function(err, result) {
    if (err) {
      console.log('ERR!: Posting error: ', err);
    }
    res.status(201).send('POST: You posted to / ! Check table in database');
  });
});

// POST to /post which queries DB
app.post('/post', function(req, res) {
  // Express body-parser
  console.log('POST: Server side received: ', req.body);
  // console.log(req.body.pmileage, req.body.cmileage, req.body.gallons, req.body.price, req.body.mpg, req.body.total);

  var params = [req.body.pmileage, req.body.cmileage, req.body.gallons, req.body.price, req.body.mpg, req.body.total];

  // console.log(params);

  var postQuery = "INSERT INTO gaslog(pmileage, cmileage, gallons, price, mpg, total) VALUES (?,?,?,?,?,?)";

  db.query(postQuery, params, function(err, result) {
    if (err) {
      console.log('ERR!: Posting error: ', err);
    }

    res.status(201).send('POSTED: Check database!');
  });

});

// Ensure server is listening
app.listen(8080, function() {
  console.log('My Gas Log server listening on port 8080');
});