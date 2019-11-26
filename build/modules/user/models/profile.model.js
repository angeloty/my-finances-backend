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
var user_model_1 = require("./user.model");
var Gender;
(function (Gender) {
    Gender["MALE"] = "male";
    Gender["FEMALE"] = "female";
    Gender["UNKNOWN"] = "unknown";
})(Gender = exports.Gender || (exports.Gender = {}));
var ProfileModel = /** @class */ (function (_super) {
    __extends(ProfileModel, _super);
    function ProfileModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.ObjectIdColumn(),
        __metadata("design:type", typeorm_1.ObjectID)
    ], ProfileModel.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        typeorm_1.Index({ unique: true }),
        __metadata("design:type", String)
    ], ProfileModel.prototype, "ci", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], ProfileModel.prototype, "firstName", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], ProfileModel.prototype, "lastName", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            enum: Gender,
            default: Gender.UNKNOWN
        }),
        __metadata("design:type", String)
    ], ProfileModel.prototype, "gender", void 0);
    __decorate([
        typeorm_1.Column({ type: 'date', nullable: true }),
        __metadata("design:type", Date)
    ], ProfileModel.prototype, "birthday", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], ProfileModel.prototype, "photo", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return user_model_1.UserModel; }, function (user) { return user.profile; }),
        __metadata("design:type", user_model_1.UserModel)
    ], ProfileModel.prototype, "user", void 0);
    ProfileModel = __decorate([
        typeorm_1.Entity()
    ], ProfileModel);
    return ProfileModel;
}(typeorm_1.BaseEntity));
exports.ProfileModel = ProfileModel;
//# sourceMappingURL=profile.model.js.map