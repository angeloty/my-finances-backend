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
var application_context_1 = require("../../../_core/application.context");
var PostNotFoundException_1 = require("../../../_core/_exceptions/PostNotFoundException");
var profile_model_1 = require("../models/profile.model");
var user_services_1 = require("./user.services");
var ProfileService = /** @class */ (function () {
    function ProfileService() {
        var _this = this;
        this.find = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var element, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.repository.findOne(id)];
                    case 1:
                        element = _a.sent();
                        if (element) {
                            return [2 /*return*/, element];
                        }
                        throw new PostNotFoundException_1.default(id);
                    case 2:
                        e_1 = _a.sent();
                        throw e_1;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.findByUser = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.findById(id)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user.profile];
                }
            });
        }); };
        this.findAll = function () { return __awaiter(_this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.repository.find({})];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_2 = _a.sent();
                        throw e_2;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.save = function (profileData, user) { return __awaiter(_this, void 0, void 0, function () {
            var userModel, profile, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.findById(user.id)];
                    case 1:
                        userModel = _a.sent();
                        console.log(userModel);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 7]);
                        profile = userModel.profile;
                        if (!profile) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.update(profile.id, profileData)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        profile = new profile_model_1.ProfileModel();
                        profile.user = userModel;
                        if (profileData.birthday) {
                            if (!(profile.birthday instanceof Date)) {
                                profileData.birthday = new Date(profileData.birthday);
                            }
                        }
                        profile = this.repository.merge(profile, profileData);
                        return [4 /*yield*/, profile.save()];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6:
                        e_3 = _a.sent();
                        if (e_3.code === 9) {
                            return [2 /*return*/, userModel.profile];
                        }
                        throw e_3;
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.update = function (id, profileData) { return __awaiter(_this, void 0, void 0, function () {
            var profile, updateResult, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.findOne(id)];
                    case 1:
                        profile = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        if (profileData.birthday) {
                            if (!(profile.birthday instanceof Date)) {
                                profileData.birthday = new Date(profileData.birthday);
                            }
                        }
                        profile = this.repository.merge(profile, profileData);
                        return [4 /*yield*/, this.repository.update(id, profileData)];
                    case 3:
                        updateResult = _a.sent();
                        return [4 /*yield*/, this.find(id)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        e_4 = _a.sent();
                        if (e_4.code === 9) {
                            return [2 /*return*/, profile];
                        }
                        throw e_4;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.remove = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var toUpdate, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.find(id)];
                    case 1:
                        toUpdate = _a.sent();
                        return [4 /*yield*/, this.repository.delete(id)];
                    case 2: return [2 /*return*/, !!(_a.sent())];
                    case 3:
                        e_5 = _a.sent();
                        throw e_5;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.repository = application_context_1.default.connection.getRepository(profile_model_1.ProfileModel);
        this.userService = new user_services_1.UserService();
    }
    return ProfileService;
}());
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map