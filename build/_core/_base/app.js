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
var application_context_1 = require("./../application.context");
var express = require("express");
require("reflect-metadata");
var dbManager_provider_1 = require("./_data/_providers/dbManager.provider");
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.moduleInstances = [];
        this.listen = function () {
            _this.app.listen(process.env.PORT, function () {
                console.log("App listening on the port " + process.env.PORT);
            });
        };
        this.init = function (config) { return __awaiter(_this, void 0, void 0, function () {
            var app, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.initializeMiddleware(config.middleware);
                        return [4 /*yield*/, this.initializeModules(config.modules)];
                    case 1:
                        app = _a.sent();
                        return [2 /*return*/, app];
                    case 2:
                        e_1 = _a.sent();
                        console.log('Error', e_1);
                        throw e_1;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getServer = function () {
            return _this.app;
        };
        this.initializeModules = function (modules) { return __awaiter(_this, void 0, void 0, function () {
            var models_1, _a, _i, _b, module_1, _c, e_2;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 6, , 7]);
                        models_1 = [];
                        modules.forEach(function (mClass) {
                            var module = new mClass();
                            _this.moduleInstances = _this.moduleInstances.concat([module]);
                            console.log("Module: " + module.constructor.name + " ......... Initializing");
                            if (module.getModels()) {
                                models_1 = models_1.concat(module.getModels());
                            }
                        });
                        console.log("DB Connection: " + process.env.DB_ADAPTER.toLocaleUpperCase() + " ......... Connecting");
                        _a = this;
                        return [4 /*yield*/, this.initializeDB(models_1)];
                    case 1:
                        _a.connection = _d.sent();
                        this.context.connection = this.connection;
                        console.log("DB Connection: " + process.env.DB_ADAPTER.toLocaleUpperCase() + " ......... Connected");
                        _i = 0, _b = this.moduleInstances;
                        _d.label = 2;
                    case 2:
                        if (!(_i < _b.length)) return [3 /*break*/, 5];
                        module_1 = _b[_i];
                        _c = this;
                        return [4 /*yield*/, module_1.init('/', this, this.connection)];
                    case 3:
                        _c.app = _d.sent();
                        _d.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, this];
                    case 6:
                        e_2 = _d.sent();
                        console.log(e_2.message);
                        throw e_2;
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.initializeDB = function (models) { return __awaiter(_this, void 0, void 0, function () {
            var e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, dbManager_provider_1.DBManager.initDB(models)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_3 = _a.sent();
                        throw e_3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.initializeMiddleware = function (middleware) {
            if (middleware) {
                middleware.forEach(function (mid) {
                    _this.app.use(mid());
                });
            }
            return _this;
        };
        this.app = express();
        application_context_1.applicationContext.app = this;
        this.context = application_context_1.applicationContext;
    }
    return App;
}());
exports.App = App;
exports.default = App;
//# sourceMappingURL=app.js.map