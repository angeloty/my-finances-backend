"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = function (config) {
    return function (target) {
        console.log("Controller: " + target.name + " ......... Initializing");
        target.prototype.getPath = function () {
            return config.path;
        };
    };
};
exports.default = exports.Controller;
//# sourceMappingURL=controller.decorator.js.map