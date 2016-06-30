'use strict';

const Hapi = require('hapi');
const Inert = require('inert'); // Hapi plugin for file reply
const Good = require('good'); // Logging
const WebpackConfig = require('./config/webpack.config.js'); // Webpack config
const HapiWebpackDevMiddleware = require('hapi-webpack-dev-middleware');
const HapiWebpackHotMiddleware = require('hapi-webpack-hot-middleware');

const queryVimeo = require('./server/plugins/queryVimeo'); // plugin for Viemo proxy

const server = new Hapi.Server();
server.connection({
  port: 3000
});

var logConfig = {
  reporters: {
    console: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{
        response: '*',
        log: '*'
      }]
    }, {
      module: 'good-console'
    }, 'stdout'],
    file: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{
        error: '*'
      }]
    }, {
      module: 'good-squeeze',
      name: 'SafeJson'
    }, {
      module: 'good-file',
      args: ['./.error_log']
    }]
  }
};

server.register([Inert, queryVimeo, {
  register: Good,
  options: logConfig
}, {
  register: HapiWebpackDevMiddleware,
  options: {
    config: WebpackConfig,
    options: {
      noInfo: true,
      publicPath: WebpackConfig.output.publicPath,
      stats: {
        colors: true
      }
    }
  }
}, {
  register: HapiWebpackHotMiddleware
}], function (err) {

  if (err) {
    server.log('error', err);
  }

  // Just a test route
  server.route({
    method: 'GET',
    path: '/api/call',
    handler: function (request, reply) {
      reply({
        message: 'Hello!'
      })
    }
  });

  server.route({
    method: 'GET',
    path: '/{filename*}',
    config: {
      auth: false,
      cache: {
        expiresIn: 24 * 60 * 60 * 1000,
        privacy: 'public'
      }
    },
    handler: {
      directory: {
        path: __dirname + '/public',
        listing: false,
        index: false
      }
    }
  });

  // Load API routes
  server.route(require('./server/routes'));

});


server.start((err) => {

  if (err) {
    server.log(['error'], err);
  }
  server.log('info', 'Server running at: ' + server.info.uri);

});
