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
var PostNotFoundException_1 = require("../../../_core/_exceptions/PostNotFoundException");
var common_service_1 = require("../../common/services/common.service");
var user_services_1 = require("../../user/services/user.services");
var EntryService = /** @class */ (function () {
    function EntryService() {
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
        this.findByUser = function (entryId, user) { return __awaiter(_this, void 0, void 0, function () {
            var id, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = user.id;
                        return [4 /*yield*/, this.repository
                                .createQueryBuilder('entry')
                                .innerJoinAndSelect('entry.currency', 'currency')
                                .innerJoinAndSelect('entry.owner', 'owner', 'owner.id = :id', { id: id })
                                .where('entry.id = :entryId', { entryId: entryId })
                                .getOne()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_2 = _a.sent();
                        throw e_2;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.findAll = function () { return __awaiter(_this, void 0, void 0, function () {
            var e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.repository.find({})];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_3 = _a.sent();
                        throw e_3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.findAllByUser = function (user) { return __awaiter(_this, void 0, void 0, function () {
            var id, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = user.id;
                        return [4 /*yield*/, this.repository
                                .createQueryBuilder('entry')
                                .innerJoinAndSelect('entry.currency', 'currency')
                                .innerJoinAndSelect('entry.owner', 'owner', 'owner.id = :id', { id: id })
                                .getMany()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_4 = _a.sent();
                        throw e_4;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.create = function (earn, owner) { return __awaiter(_this, void 0, void 0, function () {
            var toSave, currency, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        toSave = this.repository.merge({}, earn);
                        if (!(earn.currency && earn.currency.id)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.commonService.findCurrency(earn.currency.id)];
                    case 1:
                        currency = _a.sent();
                        toSave.currency = currency;
                        _a.label = 2;
                    case 2:
                        toSave.owner = owner;
                        return [4 /*yield*/, this.repository.save(toSave)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        e_5 = _a.sent();
                        throw e_5;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.update = function (id, earn, owner) { return __awaiter(_this, void 0, void 0, function () {
            var toUpdate, currency, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.find(id)];
                    case 1:
                        toUpdate = _a.sent();
                        toUpdate = this.repository.merge(toUpdate, earn);
                        if (!(earn.currency && earn.currency.id)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.commonService.findCurrency(earn.currency.id)];
                    case 2:
                        currency = _a.sent();
                        toUpdate.currency = currency;
                        _a.label = 3;
                    case 3:
                        toUpdate.owner = owner;
                        return [4 /*yield*/, this.repository.save(toUpdate)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        e_6 = _a.sent();
                        throw e_6;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.remove = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.repository.delete(id)];
                    case 1: return [2 /*return*/, !!(_a.sent())];
                    case 2:
                        e_7 = _a.sent();
                        throw e_7;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.repository = this.getRepository();
        this.commonService = new common_service_1.CommonService();
        this.userService = new user_services_1.UserService();
    }
    return EntryService;
}());
exports.EntryService = EntryService;
//# sourceMappingURL=entry.services.js.map