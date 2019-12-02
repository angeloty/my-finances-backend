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
Object.defineProperty(exports, "__esModule", { value: true });
var supertest = require("supertest");
var user_fixture_1 = require("./fixtures/user.fixture");
var app_1 = require("../../app");
var TestHelper = /** @class */ (function () {
    function TestHelper() {
        var _this = this;
        this.suite = {};
        this.initSuite = function (suite, options) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.suite[suite]) {
                            this.suite[suite] = {
                                user: {
                                    username: "suite-" + suite + "-username" + Math.random()
                                        .toString(36)
                                        .substring(7),
                                    email: "email" + Math.random()
                                        .toString(36)
                                        .substring(7) + "@" + suite + ".com",
                                    password: "pass-" + suite
                                },
                                authParam: {
                                    token: ''
                                },
                                data: {}
                            };
                        }
                        if (!options) return [3 /*break*/, 3];
                        if (!options.auth) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.initForAuthTest(suite)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loginUser(suite)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                    case 3: return [4 /*yield*/, this.init(suite)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.endSuite = function (suite) {
            return;
        };
        this.createUser = function (suite, u) { return __awaiter(_this, void 0, void 0, function () {
            var user, signUpResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.request) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.init(suite)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        user = u || this.getUser(suite) || user_fixture_1.userModel;
                        return [4 /*yield*/, this.request
                                .post('/users/signup')
                                .set('Content-Type', 'application/json')
                                .send(user)];
                    case 3:
                        signUpResponse = _a.sent();
                        user.id = signUpResponse.body.id;
                        if (!u) {
                            this.suite[suite].user = user;
                        }
                        return [2 /*return*/, signUpResponse];
                }
            });
        }); };
        this.loginUser = function (suite, u) { return __awaiter(_this, void 0, void 0, function () {
            var loginResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.request) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.init(suite)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.request
                            .post('/users/signin')
                            .set('Content-Type', 'application/json')
                            .send(u || this.getUser(suite))
                            .expect(200)];
                    case 3:
                        loginResponse = _a.sent();
                        if (!u) {
                            this.suite[suite].authParam.token = loginResponse.body.token;
                        }
                        return [2 /*return*/, loginResponse];
                }
            });
        }); };
        this.removeUser = function (suite, u) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.request) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.init(suite)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.request
                            .delete('/users/' + (u ? u.id.toString() : this.getUser(suite).id.toString()))
                            .set('Authorization', 'Bearer ' + this.getToken(suite))
                            .send()
                            .expect(204)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.getUser = function (suite) {
            return _this.suite[suite] && _this.suite[suite].user
                ? _this.suite[suite].user
                : user_fixture_1.userModel;
        };
        this.setUser = function (suite, user) {
            _this.suite[suite].user = __assign({}, _this.suite[suite].user, user);
        };
        this.getToken = function (suite) {
            return _this.suite[suite] && _this.suite[suite].authParam
                ? _this.suite[suite].authParam.token
                : user_fixture_1.authParams.token;
        };
        this.setToken = function (suite, token) {
            _this.suite[suite].authParam.token = token;
        };
        this.init = function (suite) { return __awaiter(_this, void 0, void 0, function () {
            var _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        process.env.NODE_ENV = 'test';
                        if (!this.environment) {
                            this.environment = app_1.default;
                        }
                        if (!!this.app) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.environment.init()];
                    case 1:
                        _a.app = _b.sent();
                        if (!this.request) {
                            this.request = supertest(this.app.app);
                        }
                        return [2 /*return*/];
                    case 2: return [2 /*return*/, Promise.resolve()];
                    case 3:
                        e_1 = _b.sent();
                        console.log(e_1);
                        Promise.reject(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.initForAuthTest = function (suite) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.request) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.init(suite)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.createUser(suite)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
    }
    TestHelper.prototype.setData = function (suite, index, value) {
        if (this.suite[suite]) {
            this.initSuite(suite);
        }
        this.suite[suite].data[index] = value;
    };
    TestHelper.prototype.getData = function (suite, index) {
        return this.suite[suite] ? this.suite[suite].data[index] : null;
    };
    return TestHelper;
}());
var TestSuiteHelper = new TestHelper();
exports.default = TestSuiteHelper;
//# sourceMappingURL=test.helper.js.map