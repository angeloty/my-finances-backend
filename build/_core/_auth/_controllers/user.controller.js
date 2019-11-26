"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var user_service_1 = require("./../_services/user.service");
var express = require("express");
var route_decorator_1 = require("../../_base/_controller/_decorators/route.decorator");
var user_model_1 = require("../_models/user.model");
var controller_1 = require("../../_base/_controller/controller");
var BaseUserController = /** @class */ (function (_super) {
    __extends(BaseUserController, _super);
    function BaseUserController(modelClass, serviceClass) {
        var _this = _super.call(this) || this;
        _this.modelClass = modelClass ? modelClass : user_model_1.BaseUserModel;
        _this.serviceClass = serviceClass ? serviceClass : user_service_1.BaseUserService;
        _this.service = new _this.serviceClass(_this.modelClass);
        return _this;
    }
    BaseUserController.prototype.all = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var list, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.getAll()];
                    case 1:
                        list = _a.sent();
                        return [2 /*return*/, response.status(200).send(list)];
                    case 2:
                        e_1 = _a.sent();
                        return [2 /*return*/, this.handleError(e_1, response)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseUserController.prototype.some = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var element, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.findById(request.params.id)];
                    case 1:
                        element = _a.sent();
                        return [2 /*return*/, response.status(200).send(element)];
                    case 2:
                        e_2 = _a.sent();
                        return [2 /*return*/, this.handleError(e_2, response)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseUserController.prototype.add = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var saved, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.register(request.body)];
                    case 1:
                        saved = _a.sent();
                        return [2 /*return*/, response.status(201).send(saved)];
                    case 2:
                        e_3 = _a.sent();
                        return [2 /*return*/, this.handleError(e_3, response)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseUserController.prototype.register = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var saved, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.register(request.body)];
                    case 1:
                        saved = _a.sent();
                        return [2 /*return*/, response.status(201).send(saved)];
                    case 2:
                        e_4 = _a.sent();
                        return [2 /*return*/, this.handleError(e_4, response)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseUserController.prototype.login = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, user, token, cookie, e_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.login(request.body.username, request.body.password)];
                    case 1:
                        _a = _b.sent(), user = _a.user, token = _a.token, cookie = _a.cookie;
                        response.setHeader('Set-Cookie', [cookie]);
                        return [2 /*return*/, response.status(200).send({ user: user, token: token })];
                    case 2:
                        e_5 = _b.sent();
                        return [2 /*return*/, this.handleError(e_5, response)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseUserController.prototype.logout = function (request, response) {
        response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
        return response.send(200);
    };
    BaseUserController.prototype.update = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var element, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.update(request.params.id, request.body)];
                    case 1:
                        element = _a.sent();
                        return [2 /*return*/, response.status(200).send(element)];
                    case 2:
                        e_6 = _a.sent();
                        return [2 /*return*/, this.handleError(e_6, response)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseUserController.prototype.remove = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var element, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.remove(request.params.id)];
                    case 1:
                        element = _a.sent();
                        if (element) {
                            return [2 /*return*/, response.status(204).send()];
                        }
                        return [2 /*return*/, response.status(404).send()];
                    case 2:
                        e_7 = _a.sent();
                        return [2 /*return*/, this.handleError(e_7, response)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        route_decorator_1.Get({ path: '' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], BaseUserController.prototype, "all", null);
    __decorate([
        route_decorator_1.Get({ path: ':id', secured: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], BaseUserController.prototype, "some", null);
    __decorate([
        route_decorator_1.Post({ path: '' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], BaseUserController.prototype, "add", null);
    __decorate([
        route_decorator_1.Post({ path: 'signup' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], BaseUserController.prototype, "register", null);
    __decorate([
        route_decorator_1.Post({ path: 'signin' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], BaseUserController.prototype, "login", null);
    __decorate([
        route_decorator_1.Post({ path: 'signout' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Object)
    ], BaseUserController.prototype, "logout", null);
    __decorate([
        route_decorator_1.Put({ path: ':id', secured: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], BaseUserController.prototype, "update", null);
    __decorate([
        route_decorator_1.Delete({ path: ':id', secured: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], BaseUserController.prototype, "remove", null);
    return BaseUserController;
}(controller_1.default));
exports.BaseUserController = BaseUserController;
//# sourceMappingURL=user.controller.js.map