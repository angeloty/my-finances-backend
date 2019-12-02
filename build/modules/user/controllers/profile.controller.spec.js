"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var profile_fixture_1 = require("../fixtures/profile.fixture");
var profile_model_1 = require("../models/profile.model");
var test_helper_1 = require("../../../_test/helpers/test.helper");
describe('Profile Tests', function () {
    var suite = 'profile-test';
    var helper = test_helper_1.default;
    var user = {
        username: 'test-2',
        email: 'test-2@email.uy',
        password: '1234567890'
    };
    beforeAll(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helper.initSuite(suite, {
                        auth: true
                    })];
                case 1:
                    _a.sent();
                    helper.setData(suite, 'profile', profile_fixture_1.default);
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helper.endSuite(suite)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Create Profile', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helper.request
                        .post('/profile')
                        .set('Content-Type', 'application/json')
                        .set('Authorization', "Bearer " + helper.getToken(suite))
                        .send(profile_fixture_1.default)
                        .expect(201)];
                case 1:
                    response = _a.sent();
                    expect(response.body.ci).toBe(helper.getData(suite, 'profile').ci);
                    expect(response.body.firstName).toBe(helper.getData(suite, 'profile').firstName);
                    expect(response.body.lastName).toBe(helper.getData(suite, 'profile').lastName);
                    expect(response.body.gender).toBe(helper.getData(suite, 'profile').gender.toString());
                    expect(response.body.birthday).not.toBeNull();
                    expect(response.body.id).not.toBeNull();
                    helper.setData(suite, 'profile', __assign({}, helper.getData(suite, 'profile'), { id: response.body.id }));
                    return [2 /*return*/];
            }
        });
    }); });
    test('Search & Found profile', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helper.request
                        .get('/profile')
                        .set('Authorization', "Bearer " + helper.getToken(suite))
                        .send()
                        .expect(200)];
                case 1:
                    response = _a.sent();
                    expect(response.body.id).toBe(helper.getData(suite, 'profile').id);
                    expect(response.body.firstName).toBe(helper.getData(suite, 'profile').firstName);
                    expect(response.body.lastName).toBe(helper.getData(suite, 'profile').lastName);
                    expect(response.body.gender).toBe(helper.getData(suite, 'profile').gender.toString());
                    expect(response.body.birthday).not.toBeNull();
                    expect(response.body.user).not.toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Update Profile', function () { return __awaiter(_this, void 0, void 0, function () {
        var toUpdate, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    toUpdate = Object.assign(helper.getData(suite, 'profile'), {
                        firstName: 'Isabella',
                        lastName: 'Sanchez',
                        gender: profile_model_1.Gender.FEMALE
                    });
                    return [4 /*yield*/, helper.request
                            .put('/profile')
                            .set('Content-Type', 'application/json')
                            .set('Authorization', "Bearer " + helper.getToken(suite))
                            .send(toUpdate)
                            .expect(200)];
                case 1:
                    response = _a.sent();
                    expect(response.body.ci).toBe(toUpdate.ci);
                    expect(response.body.firstName).toBe(toUpdate.firstName);
                    expect(response.body.lastName).toBe(toUpdate.lastName);
                    expect(response.body.gender).toBe(toUpdate.gender.toString());
                    expect(response.body.birthday).not.toBeNull();
                    expect(response.body.id).not.toBeNull();
                    expect(response.body.user).not.toBeNull();
                    expect(response.body.user.username).toBe(helper.getUser(suite).username);
                    helper.setData(suite, 'profile', __assign({}, helper.getData(suite, 'profile'), {
                        firstName: response.body.firstName,
                        lastName: response.body.lastName,
                        gender: toUpdate.gender
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    test('Update profile fail by ci duplication', function () { return __awaiter(_this, void 0, void 0, function () {
        var toUpdate, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    toUpdate = helper.getData(suite, 'profile');
                    return [4 /*yield*/, helper.createUser(suite, user)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, helper.loginUser(suite, user)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, helper.request
                            .put('/profile')
                            .set('Content-Type', 'application/json')
                            .set('Authorization', "Bearer " + response.body.token)
                            .send(toUpdate)
                            .expect(400)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, helper.removeUser(suite, user)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Remove profile', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helper.request
                        .delete('/profile')
                        .set('Authorization', "Bearer " + helper.getToken(suite))
                        .expect(204)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=profile.controller.spec.js.map