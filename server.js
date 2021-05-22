const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8383;

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/style.css', function(req, res) {
    res.sendFile(__dirname + "/" + "style.css");
});

app.get('/index.js', function(req, res) {
    res.sendFile(__dirname + "/" + "index.js");
});

app.get('/assets/img-spaguete.jpg', function(req, res) {
    res.sendFile(__dirname + "/" + "/assets/img-spaguete.jpg");
});


app.listen(port);
console.log('Server started at http://localhost:' + port);