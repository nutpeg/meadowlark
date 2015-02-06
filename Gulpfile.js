'use strict';

var $ = require('gulp-load-plugins')({ lazy: true });
var args = require('yargs').argv;
var config = require('./gulpconfig');
var Crawler = require('simplecrawler');
var gulp = require('gulp');

var port = process.env.PORT || config.defaultPort;
var crawler = new Crawler('localhost', '/', port);
// Utility functions

function log(msg) {
  if (typeof msg === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue('\n***** ' + msg + ' *****'));
  }
}

// Gulp tasks

gulp.task('checklinks', function(done) {
  log('Checking links');

  crawler.on('fetch404', function(queueItem, response) {
    log('Resource not found linked from ' + queueItem.referrer +
        ' to ' + queueItem.url);            // TODO: 2nd arg to log
    log('Status code: ' + response.statusCode);
  });

  crawler.on('complete', function() {
    log('Link checking done.');
    done();
  });

  crawler.start();
});

gulp.task('lint', function() {
  log('Linting JS files');
  return gulp
      .src(config.alljs)
      .pipe($.if(args.verbose, $.print()))
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe($.eslint.failOnError());
});

gulp.task('serve-dev', function() {
  var isDev = true;

  var nodeOptions = {
    script: config.nodeServer,  // define the node script to start the server
    delayTime: 1,
    env: {
      'PORT': port,
      'NODE_ENV': isDev ? 'dev' : 'build'
    },
    watch: [config.server]   // define the files on which to restart server when changed
  };

  return $.nodemon(nodeOptions)
    .on('restart', ['lint'], function(ev) {
      log('nodemon restarted');
      log('Files changed on restart' + ev);
    })
    .on('start', function() {
      log('nodemon started');
    })
    .on('crash', function() {
      log('nodemon crashed: script crashed for some reason');
    })
    .on('exit', function() {
      log('nodemon exited cleanly');
    });

});

gulp.task('default', ['lint', 'checklinks'], function() {
  log('Default task run');
});
