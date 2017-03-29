'use strict';

var fs = require('fs');

function getDockerSecret(name, defaultValue) {
  var envFile = process.env[name + '_FILE'];
  var env = process.env[name];

  if (envFile) {
    return fs.readFileSync(envFile, 'utf8').trim();
  } else if (env) {
    return env;
  }

  return defaultValue;
}

module.exports = getDockerSecret;
