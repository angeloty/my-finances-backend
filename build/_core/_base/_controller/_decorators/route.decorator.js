"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTTP_METHODS;
(function (HTTP_METHODS) {
    HTTP_METHODS["GET"] = "get";
    HTTP_METHODS["POST"] = "post";
    HTTP_METHODS["PUT"] = "put";
    HTTP_METHODS["PATCH"] = "patch";
    HTTP_METHODS["DELETE"] = "delete";
})(HTTP_METHODS = exports.HTTP_METHODS || (exports.HTTP_METHODS = {}));
var CONTENT_TYPE;
(function (CONTENT_TYPE) {
    CONTENT_TYPE["JSON"] = "application/json";
    CONTENT_TYPE["FILE"] = "multipart/form-data";
    CONTENT_TYPE["PLAIN_TEXT"] = "text/plain";
    CONTENT_TYPE["HTML"] = "text/html";
})(CONTENT_TYPE = exports.CONTENT_TYPE || (exports.CONTENT_TYPE = {}));
require("reflect-metadata");
var role_middleware_1 = require("../../_security/_middleware/role.middleware");
var auth_middleware_1 = require("../../_security/_middleware/auth.middleware");
function Route(config) {
    var middleware = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middleware[_i - 1] = arguments[_i];
    }
    return function registerProperty(target, propertyKey, descriptor) {
        var app = target.getApp();
        if (config.secured || config.roles) {
            middleware.push(auth_middleware_1.default);
        }
        if (config.roles && config.roles.length) {
            middleware.push(role_middleware_1.default.bind({}, config.roles));
        }
        if (middleware.length) {
            target.addRoute({
                middleware: middleware,
                path: config.path,
                method: config.method,
                file: config.file,
                handler: descriptor.value
            });
        }
        else {
            target.addRoute({
                path: config.path,
                method: config.method,
                file: config.file,
                handler: descriptor.value
            });
        }
    };
}
exports.Route = Route;
function Get(config) {
    var middleware = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middleware[_i - 1] = arguments[_i];
    }
    config.method = HTTP_METHODS.GET;
    return Route.apply(void 0, [config].concat(middleware));
}
exports.Get = Get;
function Post(config) {
    var middleware = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middleware[_i - 1] = arguments[_i];
    }
    config.method = HTTP_METHODS.POST;
    return Route.apply(void 0, [config].concat(middleware));
}
exports.Post = Post;
function Patch(config) {
    var middleware = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middleware[_i - 1] = arguments[_i];
    }
    config.method = HTTP_METHODS.PATCH;
    return Route.apply(void 0, [config].concat(middleware));
}
exports.Patch = Patch;
function Put(config) {
    var middleware = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middleware[_i - 1] = arguments[_i];
    }
    config.method = HTTP_METHODS.PUT;
    return Route.apply(void 0, [config].concat(middleware));
}
exports.Put = Put;
function Delete(config) {
    var middleware = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middleware[_i - 1] = arguments[_i];
    }
    config.method = HTTP_METHODS.DELETE;
    return Route.apply(void 0, [config].concat(middleware));
}
exports.Delete = Delete;
exports.default = Route;
//# sourceMappingURL=route.decorator.js.map