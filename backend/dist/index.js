"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const moleculer_1 = require("moleculer");
const connection_1 = require("./database/connection");
const broker = new moleculer_1.ServiceBroker({
    logger: true,
    logLevel: 'info',
});
broker.loadService('./src/services/api.service.ts');
broker.loadService('./src/services/user.service.ts');
broker.loadService('./src/services/note.service.ts');
broker.createService({
    name: 'gateway',
    mixins: [require('moleculer-web')],
    settings: {
        port: process.env.PORT ? parseInt(process.env.PORT) : 4005,
        cors: {
            origin: '*',
            methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
            credentials: true,
        },
        bodyParsers: {
            json: {
                strict: false,
                limit: '10MB',
            },
            urlencoded: {
                extended: true,
                limit: '10MB',
            },
        },
        routes: [
            {
                path: '/api',
                aliases: {
                    'GET health': 'api.healthCheck',
                },
                onBeforeCall(ctx, _, req) {
                    ctx.meta.body = req.body;
                },
            },
            {
                path: '/users',
                aliases: {
                    'GET ': 'users.getUsers',
                    'POST ': 'users.createUsers',
                },
                onBeforeCall(ctx, _, req) {
                    ctx.meta.body = req.body;
                },
            },
            {
                path: '/notes',
                aliases: {
                    'GET ': 'notes.getAll',
                    'GET /:id': 'notes.getOne',
                    'POST ': 'notes.insert',
                    'PATCH /:id': 'notes.update',
                    'DELETE /:id': 'notes.delete',
                },
            },
        ],
    },
    methods: {
        onRequest(req) {
            console.log(`📨 ${req.method} ${req.url}`);
            if (req.body) {
                console.log('Request body:', req.body);
            }
        },
    },
});
async function startServer() {
    try {
        console.log('Initializing database...');
        await (0, connection_1.initializeDatabase)();
        console.log('Starting Moleculer broker...');
        await broker.start();
        console.log(`Server started on port ${process.env.PORT || 4005}`);
        console.log(`Open http://localhost:${process.env.PORT || 4005}/api/users in your browser`);
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
process.on('SIGINT', async () => {
    console.log('Shutting down server...');
    await broker.stop();
    process.exit(0);
});
process.on('SIGTERM', async () => {
    console.log('Shutting down server...');
    await broker.stop();
    process.exit(0);
});
startServer();
