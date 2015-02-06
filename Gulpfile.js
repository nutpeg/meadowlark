'use strict';

var $ = require('gulp-load-plugins')({ lazy: true });
var args = require('yargs').argv;
var config = require('./gulpconfig');
var crawler = require('simplecrawler');
var gulp = require('gulp');

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
  crawler.crawl('http://localhost:3000/')
    .on('fetch404', function(queueItem, response) {
      log('Resource not found linked from ' +
                      queueItem.referrer + ' to', queueItem.url);
      log('Status code: ' + response.statusCode);
    })
    .on('complete', function() {
      done();
    });
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

gulp.task('default', ['lint', 'checklinks'], function() {
  log('Default task run');
});
