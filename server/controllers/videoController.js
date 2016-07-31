'use strict';

const Joi = require('joi'); //Schema and validation
const Boom = require('boom'); //HTTP errors
const async = require('async'); // HTTP requests

exports.getVideos = {
  validate: {
    query: {
      channels: Joi.string().trim().replace(/^[a-zA-Z\u00C0-\u017F]+,\s[a-zA-Z\u00C0-\u017F]+$/, '').required(),
    },
    failAction: function (request, reply, source, error) {
      // Return error on failed validation
      return reply(Boom.badRequest(error.data.details[0].message));
    }
  },
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
        // Assign current channel
        var currentChannel = value;

        // Vimeo doesn't return added_time via API, but allows to request data to be sorted by added time
        // Go through results, asign an order number and later sort by this property
        async.forEachOf(result, function (value, key, callback) {
          // Create place for indieCinema data
          value.indieCinema = {};
          // Add order number, for sorting by added_time
          value.indieCinema.order = key;
          // Add channel video was taken from, for filtering
          value.indieCinema.channel = currentChannel;
          callback(null);
        }, function (error) {
          if (error) {
            return callback(error);
          }
          // Put movies into general array
          movies = movies.concat(result);
          return callback(null);
        });

      });

    }, function (error) {
      if (error) {
        return reply(Boom.badRequest(error));
      }
      // Send movies back
      return reply(movies);
    })

  }
};

exports.getVideosSingle = {
  validate: {
    query: {
      channel: Joi.string().trim().required(),
    },
    failAction: function (request, reply, source, error) {
      // Return error on failed validation
      return reply(Boom.badRequest(error.data.details[0].message));
    }
  },
  handler: function (request, reply) {
    // Repack list of channels from URI in to array
    var queryChannel = request.url.query.channel;
    var movies = [];

    request.server.methods.getChannel(queryChannel, function (error, result) {
      if (error) {
        return reply(Boom.notFound(error));
      }

      // Vimeo doesn't return added_time via API, but allows to request data to be sorted by added time
      // Go through results, asign an order number and later sort by this property
      async.forEachOf(result, function (value, key, callback) {
        // Create place for indieCinema data
        value.indieCinema = {};
        // Add order number
        value.indieCinema.order = key;
        value.indieCinema.channel = queryChannel;
        callback(null);
      }, function (error) {
        if (error) {
          return reply(Boom.badRequest(error));
        }
        // Put movies into general array
        movies = movies.concat(result);
        // Send movies back
        return reply(movies);
      });

    });

  }
};
