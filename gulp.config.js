'use strict';

var appconfig = require('./app.config');

var config = {
  alljs: ['*.js', 'public/**./*js', 'lib/**/*.js', 'qa/**/*.js'],
  server: ['meadowlark.js'],  // Watch these files to trigger server restart
  // Node setup
  defaultPort: appconfig.port,
  nodeServer: 'meadowlark.js'   // Script to start server
};

module.exports = config;
