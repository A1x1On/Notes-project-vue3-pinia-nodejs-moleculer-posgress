"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setError = void 0;
const setError = (ctx, code) => {
    ctx.meta.$statusCode = code;
};
exports.setError = setError;
