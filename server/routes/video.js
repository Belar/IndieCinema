'use strict';

var Controller = require('../controllers/videoController');

module.exports = [{
  method: 'GET',
  path: '/api/getvideos',
  config: Controller.getVideos
}];
