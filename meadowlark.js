'use strict';

var express = require('express');
var fortune = require('./lib/fortune.js');
var handlebars = require('express-handlebars');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, '/public')));
app.use(function (req, res, next) {
  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
  next();
});


// Home page
app.get('/', function (req, res) {
  res.render('home');
});

// About page
app.get('/about', function (req, res) {
  res.render('about', {
    fortune: fortune.getFortune(),
    pageTestScript: '/qa/tests-about.js'
  });
});

// Hood River page
app.get('/tours/hood-river', function (req, res) {
  res.render('tours/hood-river');
});

// Request Group Rate page
app.get('/tours/request-group-rate', function (req, res) {
  res.render('tours/request-group-rate');
});

// custom 404 page
app.use(function (req, res) {
  res.status(404);
  res.render('404');
});

// custom 500 page (distiguished from 404 by number of arguments)
app.use(function (err, req, res) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost ' + app.get('port') + '.\n' +
              'Press Ctrl-C to terminate.');
});
