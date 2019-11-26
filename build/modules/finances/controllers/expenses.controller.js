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
var controller_1 = require("../../../_core/_base/_controller/controller");
var express = require("express");
var route_decorator_1 = require("../../../_core/_base/_controller/_decorators/route.decorator");
var controller_decorator_1 = require("../../../_core/_base/_controller/_decorators/controller.decorator");
var expenses_service_1 = require("../services/expenses.service");
var ExpensesController = /** @class */ (function (_super) {
    __extends(ExpensesController, _super);
    function ExpensesController() {
        var _this = _super.call(this) || this;
        _this.service = new expenses_service_1.ExpensesServices();
        return _this;
    }
    ExpensesController.prototype.all = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var list, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.findAll()];
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
    ExpensesController.prototype.some = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var element, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.find(request.params.id)];
                    case 1:
                        element = _a.sent();
                        if (element) {
                            return [2 /*return*/, response.status(200).send(element)];
                        }
                        return [2 /*return*/, response.status(404).send()];
                    case 2:
                        e_2 = _a.sent();
                        return [2 /*return*/, this.handleError(e_2, response)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ExpensesController.prototype.add = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var saved, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.create(request.body)];
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
    ExpensesController.prototype.update = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var saved, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.update(request.params.id, request.body)];
                    case 1:
                        saved = _a.sent();
                        return [2 /*return*/, response.status(200).send(saved)];
                    case 2:
                        e_4 = _a.sent();
                        return [2 /*return*/, this.handleError(e_4, response)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ExpensesController.prototype.remove = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var deleted, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.remove(request.params.id)];
                    case 1:
                        deleted = _a.sent();
                        if (deleted) {
                            return [2 /*return*/, response.status(204).send()];
                        }
                        return [2 /*return*/, response.status(404).send()];
                    case 2:
                        e_5 = _a.sent();
                        return [2 /*return*/, this.handleError(e_5, response)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        route_decorator_1.Get({ path: 'earns', secured: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ExpensesController.prototype, "all", null);
    __decorate([
        route_decorator_1.Get({ path: ':id', secured: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ExpensesController.prototype, "some", null);
    __decorate([
        route_decorator_1.Post({ path: '', secured: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ExpensesController.prototype, "add", null);
    __decorate([
        route_decorator_1.Put({ path: ':id', secured: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ExpensesController.prototype, "update", null);
    __decorate([
        route_decorator_1.Delete({ path: ':id', secured: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ExpensesController.prototype, "remove", null);
    ExpensesController = __decorate([
        controller_decorator_1.Controller({ path: 'expenses' }),
        __metadata("design:paramtypes", [])
    ], ExpensesController);
    return ExpensesController;
}(controller_1.default));
exports.ExpensesController = ExpensesController;
exports.default = ExpensesController;
//# sourceMappingURL=expenses.controller.js.map