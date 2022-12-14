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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var test_helper_1 = require("../../../_test/helpers/test.helper");
describe('User Tests', function () {
    var suite = 'user-test';
    var helper = test_helper_1.default;
    beforeAll(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helper.initSuite(suite)];
                case 1:
                    _a.sent();
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
    test('Testing insert user', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helper.request
                        .post('/users/signup')
                        .set('Content-Type', 'application/json')
                        .send(helper.getUser(suite))
                        .expect(201)];
                case 1:
                    response = _a.sent();
                    expect(response.body.username).toBe(helper.getUser(suite).username);
                    expect(response.body.email).toBe(helper.getUser(suite).email);
                    expect(response.body.active).toBeTruthy();
                    expect(response.body.id).not.toBeNull();
                    helper.setUser(suite, { id: response.body.id });
                    return [2 /*return*/];
            }
        });
    }); });
    test('Testing user login', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helper.request
                        .post('/users/signin')
                        .set('Content-Type', 'application/json')
                        .send(helper.getUser(suite))
                        .expect(200)];
                case 1:
                    response = _a.sent();
                    expect(response.body.user).not.toBeNull();
                    expect(response.body.token).not.toBeNull();
                    expect(response.body.user.username).toBe(helper.getUser(suite).username);
                    expect(response.body.user.email).toBe(helper.getUser(suite).email);
                    expect(response.body.user.id).toBe(helper.getUser(suite).id);
                    helper.setToken(suite, response.body.token);
                    return [2 /*return*/];
            }
        });
    }); });
    test('Testing get user', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helper.request
                        .get("/users/" + helper.getUser(suite).id)
                        .set('Authorization', "Bearer " + helper.getToken(suite))
                        .send()
                        .expect(200)];
                case 1:
                    response = _a.sent();
                    expect(response.body.username).toBe(helper.getUser(suite).username);
                    expect(response.body.email).toBe(helper.getUser(suite).email);
                    expect(response.body.id).toBe(helper.getUser(suite).id);
                    expect(response.body.active).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Testing update user', function () { return __awaiter(_this, void 0, void 0, function () {
        var user, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        username: 'new-test',
                        email: 'new-test@email'
                    };
                    return [4 /*yield*/, helper.request
                            .put("/users/" + helper.getUser(suite).id)
                            .set('Content-Type', 'application/json')
                            .set('Authorization', "Bearer " + helper.getToken(suite))
                            .send(user)
                            .expect(200)];
                case 1:
                    response = _a.sent();
                    helper.setUser(suite, user);
                    expect(response.body.username).toBe(helper.getUser(suite).username);
                    expect(response.body.email).toBe(helper.getUser(suite).email);
                    expect(response.body.id).toBe(helper.getUser(suite).id);
                    expect(response.body.active).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Testing block username duplicated', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helper.request
                        .post('/users/signup')
                        .set('Content-Type', 'application/json')
                        .send({
                        username: helper.getUser(suite).username,
                        email: 'other@email',
                        password: '1234567'
                    })
                        .expect(400)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Testing block email duplicated', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helper.request
                        .post('/users/signup')
                        .set('Content-Type', 'application/json')
                        .send({
                        username: 'other-new-test',
                        email: helper.getUser(suite).email,
                        password: '1234567'
                    })
                        .expect(400)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Testing get all users', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helper.request
                        .get('/users')
                        .send()
                        .expect(200)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Testing delete user', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helper.request
                        .delete("/users/" + helper.getUser(suite).id)
                        .set('Authorization', "Bearer " + helper.getToken(suite))
                        .send()
                        .expect(204)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, helper.request
                            .get("/users/" + helper.getUser(suite).id)
                            .set('Authorization', "Bearer " + helper.getToken(suite))
                            .send()
                            .expect(404)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=user.controller.spec.js.map