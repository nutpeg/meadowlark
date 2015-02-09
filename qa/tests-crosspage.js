'use strict';

var assert = require('chai').assert;
var Browser = require('zombie');
var appconfig = require('../app.config');

var browser;

suite('Cross-page tests', function () {
  setup(function () {
    browser = new Browser();
  });

  var localhost = 'http://localhost:' + appconfig.port;

  test('Requesting a group rate quote from the hood river tour page' +
       ' should populate the referrer field.', function (done) {
    var referrer = localhost + '/tours/hood-river';
    console.log(referrer);
    browser.visit(referrer, function () {
      browser.clickLink('.requestGroupRate', function () {
        assert(browser.field('referrer').value === referrer);
        done();
      });
    });
  });

  test('Requesting a group rate from the Oregon Coast tour page should' +
            ' populate the referrer field', function (done) {
    var referrer = localhost + '/tours/oregon-coast';
    browser.visit(referrer, function () {
      browser.clickLink('.requestGroupRate', function () {
        assert(browser.field('referrer').value === referrer);
        done();
      });
    });
  });

  test('Visiting the "request group rate" page directly should result in ' +
            ' an empty referrer field', function (done) {
    var referrer = localhost + '/tours/request-group-rate';
    browser.visit(referrer, function () {
      assert(browser.field('referrer').value === '');
      done();
    });
  });
});
