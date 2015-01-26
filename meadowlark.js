'use strict';

var express = require('express');
var handlebars = require('express-handlebars');

var app = express();

app.set('port', process.env.PORT || 3000);
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));



// Home page
app.get('/', function (req, res) {
  res.render('home');
});

// About page
app.get('/about', function (req, res) {
  res.render('about');
});

// custom 404 page
app.use(function (req, res) {
  res.status(404);
  res.render('404');
});

// custom 500 page (distiguished from 404 by number of arguments)
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost' + app.get('port') + '.\n' + 
              'Press Ctrl-C to terminate.');
});