'use strict';

var Controller = require('../controllers/videoController');

module.exports = [{
  method: 'GET',
  path: '/api/get-videos',
  config: Controller.getVideos
},{
  method: 'GET',
  path: '/api/get-videos-single',
  config: Controller.getVideosSingle
}];
