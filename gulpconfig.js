'use strict';

var config = {
  alljs: ['*.js', 'public/**./*js', 'lib/**/*.js', 'qa/**/*.js'],
  server: ['meadowlark.js'],  // Watch these files to trigger server restart
  // Node setup
  defaultPort: 3030,
  nodeServer: 'meadowlark.js'   // Script to start server
};

module.exports = config;
