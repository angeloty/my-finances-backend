"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
process.env.NODE_ENV = 'test';
var environment = app_1.default;
var testAppContainer = environment.init();
exports.default = testAppContainer;
//# sourceMappingURL=test.index.js.map