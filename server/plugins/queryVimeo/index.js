'use strict';
const path = require('path');

const Wreck = require('wreck'); // HTTP requests
const config = require('../../../config/secret'); // Config

// Register Hapi plugin
exports.register = function (server, options, next) {

  // Define function for method
  var getChannel = function (value, next) {

    var method = 'GET';
    var uri = '/channels/' + value + '/videos?per_page=10&sort=added&filter_content_rating=[drugs,nudity]&fields=uri,name,pictures,release_time,embed.html,description,user.link,user.name';

    // Wreck callback, executed after data is received
    var optionalCallback = function (error, result) {
      if (error) {
        // Pass error back
        return next(error);
      }
      // TODO: Monitor rate limit headers
      // console.log('X-Ratelimit-Limit: ' + result.headers['x-ratelimit-limit']);
      // console.log('X-Ratelimit-Remaining: ' + result.headers['x-ratelimit-remaining']);
      // console.log('X-Ratelimit-Reset: ' + result.headers['x-ratelimit-reset']);

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
      baseUrl: 'https://api.vimeo.com/',
      headers: {
        'Accept': 'application/vnd.vimeo.*+json;version=3.2',
        'Authorization': 'Bearer ' + config.vimeo.vimeoAccessToken,
        'User-Agent': config.vimeo.user_agent
      },
      timeout: 5000, // default: unlimited
      maxBytes: 1048576, // 1 MB, default: unlimited
      rejectUnauthorized: true
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
    cache: config.vimeo.cache
  });

  next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};
