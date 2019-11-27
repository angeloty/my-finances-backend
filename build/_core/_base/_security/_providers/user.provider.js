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
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var wrongCredentials_exception_1 = require("../_exceptions/wrongCredentials.exception");
var userNotFound_exception_1 = require("../_exceptions/userNotFound.exception");
var invalidUserData_exception_1 = require("../_exceptions/invalidUserData.exception");
var HttpException_1 = require("../../../_exceptions/HttpException");
var roles_enum_1 = require("../_interfaces/roles.enum");
var UserProvider = /** @class */ (function () {
    function UserProvider() {
    }
    UserProvider.find = function (connection, modelClass, id) {
        return __awaiter(this, void 0, void 0, function () {
            var repository, element, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        repository = connection.getRepository(modelClass);
                        return [4 /*yield*/, repository.findOne(id)];
                    case 1:
                        element = _a.sent();
                        if (element) {
                            return [2 /*return*/, element];
                        }
                        throw new userNotFound_exception_1.default();
                    case 2:
                        e_1 = _a.sent();
                        throw e_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserProvider.create = function (connection, modelClass, user) {
        return __awaiter(this, void 0, void 0, function () {
            var repository, element, _a, saved, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        repository = connection.getRepository(modelClass);
                        element = repository.merge(new modelClass(), user);
                        _a = element;
                        return [4 /*yield*/, bcrypt.hash(user.password, 10)];
                    case 1:
                        _a.password = _b.sent();
                        element.active = true;
                        element.role = roles_enum_1.ROLE.USER;
                        return [4 /*yield*/, repository.save(element)];
                    case 2:
                        saved = _b.sent();
                        return [2 /*return*/, saved];
                    case 3:
                        e_2 = _b.sent();
                        if (e_2.code === 11000) {
                            throw new invalidUserData_exception_1.default();
                        }
                        throw e_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserProvider.update = function (connection, modelClass, id, data, forceData) {
        return __awaiter(this, void 0, void 0, function () {
            var repository, user, updated, index, updateResult, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        repository = connection.getRepository(modelClass);
                        return [4 /*yield*/, UserProvider.find(connection, modelClass, id)];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 4];
                        updated = {
                            username: data.username ? data.username : user.username,
                            email: data.email ? data.email : user.email
                        };
                        if (forceData) {
                            for (index in forceData) {
                                if (forceData.hasOwnProperty(index)) {
                                    updated[index] = forceData[index];
                                }
                            }
                        }
                        return [4 /*yield*/, repository.update(user.id, repository.merge(user, updated))];
                    case 2:
                        updateResult = _a.sent();
                        return [4 /*yield*/, UserProvider.find(connection, modelClass, user.id)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: throw new userNotFound_exception_1.default();
                    case 5:
                        e_3 = _a.sent();
                        if (e_3.code === 11000) {
                            throw new invalidUserData_exception_1.default();
                        }
                        throw new invalidUserData_exception_1.default();
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserProvider.remove = function (connection, modelClass, id) {
        return __awaiter(this, void 0, void 0, function () {
            var repository, element, deleted, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        repository = connection.getRepository(modelClass);
                        return [4 /*yield*/, UserProvider.find(connection, modelClass, id)];
                    case 1:
                        element = _a.sent();
                        return [4 /*yield*/, repository.delete(id)];
                    case 2:
                        deleted = _a.sent();
                        console.log(deleted);
                        if (deleted) {
                            return [2 /*return*/, true];
                        }
                        throw new HttpException_1.default(500, 'Operation Fail!!!');
                    case 3:
                        e_4 = _a.sent();
                        throw e_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserProvider.login = function (connection, modelClass, username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var repository, result, loggedIn, passwordMatching, jwToken, token, cookie, user, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        repository = connection.getRepository(modelClass);
                        return [4 /*yield*/, repository.find({
                                where: {
                                    username: username
                                },
                                select: ['password', 'username', 'id']
                            })];
                    case 1:
                        result = _a.sent();
                        if (!result.length) return [3 /*break*/, 4];
                        loggedIn = result[0];
                        return [4 /*yield*/, bcrypt.compare(password, loggedIn.password)];
                    case 2:
                        passwordMatching = _a.sent();
                        if (!passwordMatching) return [3 /*break*/, 4];
                        jwToken = UserProvider.createToken(loggedIn);
                        token = jwToken.token;
                        cookie = UserProvider.createCookie(jwToken);
                        return [4 /*yield*/, UserProvider.find(connection, modelClass, loggedIn.id)];
                    case 3:
                        user = _a.sent();
                        return [2 /*return*/, { user: user, token: token, cookie: cookie }];
                    case 4: throw new wrongCredentials_exception_1.default();
                    case 5:
                        e_5 = _a.sent();
                        throw e_5;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserProvider.createToken = function (user) {
        var expiresIn = parseFloat(process.env.JWT_EXPIRES);
        var secret = process.env.JWT_SECRET;
        var dataStoredInToken = {
            _id: user.id.toString()
        };
        return {
            expiresIn: expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn: expiresIn })
        };
    };
    UserProvider.createCookie = function (tokenData) {
        return "Authorization=" + tokenData.token + "; HttpOnly; Max-Age=" + tokenData.expiresIn;
    };
    return UserProvider;
}());
exports.UserProvider = UserProvider;
//# sourceMappingURL=user.provider.js.map