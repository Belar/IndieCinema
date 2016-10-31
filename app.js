'use strict';

const Hapi = require('hapi');
const Inert = require('inert'); // File reply
const Good = require('good'); // Logging
const h2o2 = require('h2o2'); // Proxy

const queryVimeo = require('./server/plugins/queryVimeo'); // plugin for Viemo proxy

const server = new Hapi.Server();

if (process.env.NODE_ENV !== 'production') {
  server.connection({
    port: 3000
  });
} else {
  server.connection({
    port: 3000,
    routes: {
      security: {
        hsts: {
          maxAge: 15768000,
          includeSubDomains: true,
          preload: true
        },
        xframe: true,
        xss: true
      }
    }
  });
}

var logConfig = {
  reporters: {
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

// Register webpack HMR, only for non-production environments
if (process.env.NODE_ENV !== 'production') {

  const WebpackConfig = require('./config/webpack.config.js'); // Webpack config
  const HapiWebpackDevMiddleware = require('hapi-webpack-dev-middleware');
  const HapiWebpackHotMiddleware = require('hapi-webpack-hot-middleware');

  server.register([{
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
      throw err;
    }
  });

}

server.register([Inert, h2o2, queryVimeo, {
  register: Good,
  options: logConfig
}], function (err) {

  if (err) {
    throw err;
  }

  // Load API routes
  server.route(require('./server/routes'));

  server.route({
    method: 'GET',
    path: '/assets/{filepath*}',
    config: {
      auth: false,
      cache: {
        expiresIn: 24 * 60 * 60 * 1000,
        privacy: 'public'
      }
    },
    handler: {
      directory: {
        path: __dirname + '/public/assets/',
        listing: false,
        index: false
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/build/{filepath*}',
    config: {
      auth: false,
      cache: {
        expiresIn: 24 * 60 * 60 * 1000,
        privacy: 'public'
      }
    },
    handler: {
      directory: {
        path: __dirname + '/public/build/',
        listing: false,
        index: false
      }
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    server.route({
      method: 'GET',
      path: '/{path*}',
      handler: {
        proxy: {
          uri: 'http://localhost:3000/'
        }
      }
    });
  } else {
    server.route({
      method: 'GET',
      path: '/{path*}',
      handler: function (request, reply) {
        reply.file('./public/index.html');
      }
    });
  }

});

server.start((err) => {

  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
