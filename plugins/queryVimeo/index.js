'use strict';

const Wreck = require('wreck'); // HTTP requests
const config = require('../../config/secret'); // Config

// Register Hapi plugin
exports.register = function (server, options, next) {

  // Define function for method
  var getChannel = function (value, next) {

    var method = 'GET';
    var uri = 'https://api.vimeo.com/channels/' + value + '/videos?per_page=10&sort=added&direction=desc';

    // Wreck callback, executed after data is received
    var optionalCallback = function (error, result) {
      if (error) {
        // Pass error back
        return next(error);
      }
      // TODO: Monitor rate limit headers
      // console.log(result.headers);

      // Response buffer, parsed to json
      Wreck.read(result, {
        json: true
      }, function (error, body) {
        // Pass pure query result to
        return next(null, body.data);
      });
    };

    // Wreck options
    var options = {
      headers: {
        'Accept': 'application/vnd.vimeo.*+json;version=3.2',
        'Authorization': 'Bearer ' + config.vimeoAccessToken
      }
    };

    // Execute the call
    Wreck.request(method, uri, options, optionalCallback);
  };

  // Define server method
  server.method('getChannel', getChannel, {
    // Generate a key to identify data in cache
    generateKey: function (value) {
      return value;
    },
    // Cache data from server method
    cache: {
      expiresIn: 10 * 60 * 1000,
      staleIn: 5 * 60 * 1000,
      staleTimeout: 100,
      generateTimeout: 5000
    }
  });

  next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};
