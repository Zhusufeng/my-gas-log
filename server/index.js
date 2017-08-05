var express = require('express');
var app = express();
var bodyParser = require('body-parser');

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