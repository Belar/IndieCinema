var Controller = require('../controllers/videoController');

module.exports = [{
  method: 'GET',
  path: '/getvideos',
  config: Controller.getVideos
}];
