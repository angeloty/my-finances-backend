"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_model_1 = require("./modules/user/models/user.model");
var user_module_1 = require("./modules/user/user.module");
require("reflect-metadata");
var express = require("express");
var cookieParser = require("cookie-parser");
var environment_1 = require("./_core/_base/environment");
var finances_module_1 = require("./modules/finances/finances.module");
var common_module_1 = require("./modules/common/common.module");
var appEnvironment = new environment_1.Environment({
    modules: [common_module_1.default, finances_module_1.FinancesModule, user_module_1.UserModule],
    environment: process.env.NODE_ENV,
    middleware: [
        express.urlencoded.bind(express, { extended: false }),
        express.json,
        express.text,
        cookieParser
    ],
    security: {
        userModel: user_model_1.UserModel
    }
});
exports.default = appEnvironment;
//# sourceMappingURL=app.js.map