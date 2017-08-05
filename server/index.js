var express = require('express');
var app = express();

// Serve static file
app.use(express.static('compiled/client'));

// Basic GET to /
app.get('/', function(request, response) {
  response.send('Hello you did a GET request');
});

// Basic POST to /
app.post('/', function(request, response) {
  response.send('Got a POST request');
})

// Ensure server is listening
app.listen(8080, function() {
  console.log('My Gas Log server listening on port 8080');
})