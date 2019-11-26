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
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var CurrencyModel = /** @class */ (function (_super) {
    __extends(CurrencyModel, _super);
    function CurrencyModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CurrencyModel_1 = CurrencyModel;
    var CurrencyModel_1;
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", typeorm_1.ObjectID)
    ], CurrencyModel.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], CurrencyModel.prototype, "symbol", void 0);
    __decorate([
        typeorm_1.Column({ length: 2, type: 'varchar' }),
        typeorm_1.Index({ unique: true }),
        __metadata("design:type", String)
    ], CurrencyModel.prototype, "codeIso2", void 0);
    __decorate([
        typeorm_1.Column({ length: 3, type: 'varchar' }),
        typeorm_1.Index({ unique: true }),
        __metadata("design:type", String)
    ], CurrencyModel.prototype, "codeIso3", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], CurrencyModel.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({ type: 'decimal', precision: 6, scale: 6 }),
        __metadata("design:type", Number)
    ], CurrencyModel.prototype, "exchangeRateOutcome", void 0);
    __decorate([
        typeorm_1.Column({ type: 'decimal', precision: 6, scale: 6 }),
        __metadata("design:type", Number)
    ], CurrencyModel.prototype, "exchangeRateIncome", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return CurrencyModel_1; }, function (currency) { return currency.children; }),
        __metadata("design:type", CurrencyModel)
    ], CurrencyModel.prototype, "parent", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return CurrencyModel_1; }, function (currency) { return currency.parent; }),
        __metadata("design:type", Array)
    ], CurrencyModel.prototype, "children", void 0);
    CurrencyModel = CurrencyModel_1 = __decorate([
        typeorm_1.Entity()
    ], CurrencyModel);
    return CurrencyModel;
}(typeorm_1.BaseEntity));
exports.CurrencyModel = CurrencyModel;
//# sourceMappingURL=currency.model.js.map