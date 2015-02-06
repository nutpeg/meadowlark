'use strict';

var assert = require('chai').assert;
var Browser = require('zombie');

var browser;

suite('Cross-page tests', function () {
  setup(function () {
    browser = new Browser();
  });

  test('Requesting a group rate quote from the hood river tour page' +
       ' should populate the referrer field.', function (done) {
    var referrer = 'http://localhost:3030/tours/hood-river';
    browser.visit(referrer, function () {
      browser.clickLink('.requestGroupRate', function () {
        assert(browser.field('referrer').value === referrer);
        done();
      });
    });
  });

  test('Requesting a group rate from the Oregon Coast tour page should' +
            ' populate the referrer field', function (done) {
    var referrer = 'http://localhost:3030/tours/oregon-coast';
    browser.visit(referrer, function () {
      browser.clickLink('.requestGroupRate', function () {
        assert(browser.field('referrer').value === referrer);
        done();
      });
    });
  });

  test('Visiting the "request group rate" page directly should result in ' +
            ' an empty referrer field', function (done) {
    var referrer = 'http://localhost:3030/tours/request-group-rate';
    browser.visit(referrer, function () {
      assert(browser.field('referrer').value === '');
      done();
    });
  });
});
