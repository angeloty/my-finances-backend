"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var application_context_1 = require("./../../application.context");
var express = require("express");
var HttpException_1 = require("../../_exceptions/HttpException");
var route_decorator_1 = require("./_decorators/route.decorator");
var uploader_middleware_1 = require("./_middleware/uploader.middleware");
var logger_middleware_1 = require("./_middleware/logger.middleware");
var BaseController = /** @class */ (function () {
    function BaseController() {
        var _this = this;
        this.getRouter = function () {
            return _this.router;
        };
        this.setRouter = function (router) {
            _this.router = router;
        };
        this.setConnection = function (connection) {
            _this.connection = connection;
        };
        this.setApp = function (app) {
            _this.app = app;
        };
        this.loadRoutes = function () {
            var prefix = _this.getPath() ? '/' + _this.getPath() : '';
            _this.routes.forEach(function (route) {
                var _a;
                var path = prefix + '/' + route.path;
                if (!route.consume) {
                    route.consume = route_decorator_1.CONTENT_TYPE.JSON;
                }
                switch (route.consume) {
                    case route_decorator_1.CONTENT_TYPE.FILE:
                        break;
                    case route_decorator_1.CONTENT_TYPE.HTML:
                        break;
                    case route_decorator_1.CONTENT_TYPE.PLAIN_TEXT:
                        break;
                    default:
                        break;
                }
                route.middleware = route.middleware
                    ? route.middleware.concat([logger_middleware_1.loggerMiddleware]) : [logger_middleware_1.loggerMiddleware];
                if (route.file) {
                    route.middleware = route.middleware.concat([uploader_middleware_1.default]);
                }
                if (route.middleware) {
                    (_a = _this.router)[route.method].apply(_a, [path].concat(route.middleware, [route.handler.bind(_this)]));
                }
                else {
                    _this.router[route.method](path, route.handler.bind(_this));
                }
                console.log("Endpoint: " + route.method.toUpperCase() + " (consume: " + route.consume + ")-> \"" + path + "\" ....... Initialized");
            });
        };
        this.connection = application_context_1.applicationContext.connection;
        this.app = application_context_1.applicationContext.app;
        this.router = express.Router();
        this.loadRoutes();
    }
    BaseController.prototype.addRoute = function (route) {
        if (!this.routes) {
            this.routes = [];
        }
        this.routes = this.routes.concat([route]);
    };
    BaseController.prototype.setPath = function (path) {
        this.path = path;
    };
    BaseController.prototype.getPath = function () {
        return this.path;
    };
    BaseController.prototype.getApp = function () {
        return this.app;
    };
    BaseController.prototype.getRepository = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        if (!!this.connection.isConnected) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.connection.connect()];
                    case 1:
                        _a.connection = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this.connection.getRepository(model)];
                    case 3:
                        e_1 = _b.sent();
                        throw e_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BaseController.prototype.handleError = function (e, response) {
        if (e instanceof HttpException_1.default) {
            return response.status(e.status).send(e.message);
        }
        if (e.status) {
            return response.status(e.status).send(e.message);
        }
        if (e.code === 1000) {
            return response.status(405).send(e.message);
        }
        console.log(e);
        return response.status(500).send(e.message);
    };
    BaseController.prototype.uploadFile = function (fileIndex, req) {
        return __awaiter(this, void 0, void 0, function () {
            var col, data, files, i, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.loadCollection(fileIndex, application_context_1.applicationContext.fileDB)];
                    case 1:
                        col = _a.sent();
                        data = void 0;
                        data = col.insert(req.files);
                        application_context_1.applicationContext.fileDB.saveDatabase();
                        files = [];
                        if (Array.isArray(req.files)) {
                            files = req.files.map(function (f) { return f; });
                        }
                        else {
                            for (i in req.files) {
                                if (req.files.hasOwnProperty(i)) {
                                    files = files.concat(req.files[i].map(function (f) { return f; }));
                                }
                            }
                        }
                        return [2 /*return*/, files];
                    case 2:
                        err_1 = _a.sent();
                        throw err_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseController.prototype.loadCollection = function (colName, db) {
        return new Promise(function (resolve, reject) {
            db.loadDatabase({}, function () {
                var collection = db.getCollection(colName) || db.addCollection(colName);
                resolve(collection);
            });
        });
    };
    BaseController.prototype.upload = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, file];
                }
                catch (e) {
                    throw e;
                }
                return [2 /*return*/];
            });
        });
    };
    return BaseController;
}());
exports.BaseController = BaseController;
exports.default = BaseController;
//# sourceMappingURL=controller.js.map