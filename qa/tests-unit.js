'use strict';

var expect = require('chai').expect;
var fortune = require('../lib/fortune.js');

suite('Fortune cookie tests', function () {

   test('getFortune() should return a fortune', function () {
     expect(typeof fortune.getFortune() === 'string');
   });
});
