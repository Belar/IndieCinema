const Joi = require('joi'); //Schema and validation
const Boom = require('boom'); //HTTP errors
const Wreck = require('wreck'); // HTTP requests

const config = require('../../config/secret'); // config

exports.getVideos = {
  handler: function (request, reply) {
      console.log('Video endpoint');
      return reply().code(200);
  }
};
