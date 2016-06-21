'use strict';

const Hapi = require('hapi');
const Inert = require('inert');

const server = new Hapi.Server();
server.connection({
    port: 3000
});

server.register([Inert], function (err) {

    if (err) {
        throw err;
    }

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
        path: '/',
        handler: function (request, reply) {
            reply.file('./public/index.html');
        }
    });
  // Load API routes
  server.route(require('./server/routes'));
  
});


server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
