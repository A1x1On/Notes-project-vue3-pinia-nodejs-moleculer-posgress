"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = exports.TryDBConnect = exports.DBConnect = void 0;
const typeorm_1 = require("typeorm");
const ormconfig_1 = __importDefault(require("../ormconfig"));
let dataSource;
const DBConnect = async () => {
    try {
        if (!dataSource) {
            exports.dataSource = dataSource = new typeorm_1.DataSource(ormconfig_1.default);
        }
        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }
        console.log("🌴 Database connection was successful!");
    }
    catch (e) {
        console.error("ERROR: Database connection failed!!", e);
        throw e;
    }
};
exports.DBConnect = DBConnect;
const TryDBConnect = async (onError, next) => {
    try {
        await (0, exports.DBConnect)();
        if (next) {
            next();
        }
    }
    catch (e) {
        onError();
    }
};
exports.TryDBConnect = TryDBConnect;
