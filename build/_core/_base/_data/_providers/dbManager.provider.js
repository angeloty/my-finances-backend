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
var typeorm_1 = require("typeorm");
var DBManager = /** @class */ (function () {
    function DBManager() {
    }
    DBManager.initDB = function (models) { return __awaiter(_this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, DBManager.connect(models)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    e_1 = _a.sent();
                    throw e_1;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    DBManager.connect = function (models, options) { return __awaiter(_this, void 0, void 0, function () {
        var _a, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    _a = process.env.DB_ADAPTER;
                    switch (_a) {
                        case 'mysql': return [3 /*break*/, 1];
                        case 'mariadb': return [3 /*break*/, 1];
                        case 'mongodb': return [3 /*break*/, 3];
                    }
                    return [3 /*break*/, 5];
                case 1: return [4 /*yield*/, DBManager.connectMySql(models, options)];
                case 2: return [2 /*return*/, _b.sent()];
                case 3: return [4 /*yield*/, DBManager.connectMongoDB(models, options)];
                case 4: return [2 /*return*/, _b.sent()];
                case 5: return [3 /*break*/, 7];
                case 6:
                    e_2 = _b.sent();
                    throw e_2;
                case 7: return [2 /*return*/];
            }
        });
    }); };
    DBManager.connectMySql = function (models, options) { return __awaiter(_this, void 0, void 0, function () {
        var opt, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    opt = !options
                        ? {
                            // name: process.env.DB_ADAPTER,
                            type: process.env.DB_ADAPTER,
                            host: process.env.DB_HOST,
                            port: +process.env.DB_PORT,
                            username: process.env.DB_USER,
                            password: process.env.DB_PASS,
                            database: process.env.DB_NAME,
                            synchronize: true,
                            logging: false,
                            entities: models
                                ? models
                                : ['src/models/**/*.ts', 'src/modules/**/models/**/*.ts'],
                            migrations: [
                                'src/migration/**/*.ts',
                                'src/modules/**/migration/**/*.ts'
                            ],
                            subscribers: [
                                'src/subscriber/**/*.ts',
                                'src/modules/**/subscriber/**/*.ts'
                            ],
                            cli: {
                                entitiesDir: 'src/entity',
                                migrationsDir: 'src/migration',
                                subscribersDir: 'src/subscriber'
                            }
                        }
                        : options;
                    console.log('Connection options', opt);
                    return [4 /*yield*/, typeorm_1.createConnection(opt)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    e_3 = _a.sent();
                    console.log(e_3.message);
                    throw e_3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    DBManager.connectMongoDB = function (models, options) { return __awaiter(_this, void 0, void 0, function () {
        var opt, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    opt = !options
                        ? {
                            // name: process.env.DB_ADAPTER,
                            type: process.env.DB_ADAPTER,
                            host: process.env.DB_HOST,
                            port: +process.env.DB_PORT,
                            username: process.env.DB_USER,
                            password: process.env.DB_PASS,
                            database: process.env.DB_NAME,
                            synchronize: true,
                            logging: false,
                            authSource: 'admin',
                            entities: models
                                ? models
                                : ['src/models/*.ts', 'src/modules/**/models/*.ts'],
                            migrations: [
                                'src/migration/**/*.ts',
                                'src/modules/**/migration/**/*.ts'
                            ],
                            subscribers: [
                                'src/subscriber/**/*.ts',
                                'src/modules/**/subscriber/**/*.ts'
                            ],
                            cli: {
                                entitiesDir: 'src/entity',
                                migrationsDir: 'src/migration',
                                subscribersDir: 'src/subscriber'
                            }
                        }
                        : options;
                    return [4 /*yield*/, typeorm_1.createConnection(opt)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    e_4 = _a.sent();
                    console.log(e_4.message);
                    throw e_4;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return DBManager;
}());
exports.DBManager = DBManager;
//# sourceMappingURL=dbManager.provider.js.map