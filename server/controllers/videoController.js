'use strict';

const Joi = require('joi'); //Schema and validation
const Boom = require('boom'); //HTTP errors
const async = require('async'); // HTTP requests

exports.getVideos = {
  handler: function (request, reply) {

    // Repack list of channels from URI in to array
    var queryChannels = request.url.query.channels.split(',');
    var movies = [];

    // Send movies back after all channels are gathered (async lib)
    async.forEachOf(queryChannels, function (value, key, callback) {
      // Call server method provided by the plugin
      request.server.methods.getChannel(value, function (error, result) {
        if (error) {
          return callback(error);
        }
        // Put movies into general array
        movies = movies.concat(result);
        return callback(null);
      });

    }, function (error) {
      if (error) {
        return reply({
          error: error
        }).code(500);
      }
      // Send movies back
      return reply(movies);
    })

  }
};
