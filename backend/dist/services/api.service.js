"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../database/connection");
module.exports = {
    name: 'api',
    actions: {
        async healthCheck() {
            return {
                status: 'OK',
                timestamp: new Date().toISOString(),
                database: connection_1.AppDataSource.isInitialized ? 'connected' : 'disconnected',
            };
        },
    },
    started() {
        console.log('API Service started');
    },
};
