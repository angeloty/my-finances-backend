"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var path_1 = require("path");
function configEnv() {
    console.log("Environment is '" + process.env.NODE_ENV + "'");
    switch (process.env.NODE_ENV) {
        case 'development':
            dotenv_1.config({
                path: path_1.resolve(__dirname, '../../.env.development')
            });
            break;
        case 'test':
            dotenv_1.config({
                path: path_1.resolve(__dirname, '../../.env.test')
            });
            break;
        // Add 'staging' and 'production' cases here as well!
        default:
            dotenv_1.config({
                path: path_1.resolve(__dirname, '../../.env')
            });
    }
}
exports.configEnv = configEnv;
exports.default = configEnv;
//# sourceMappingURL=config.js.map