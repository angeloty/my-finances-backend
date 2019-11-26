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
Object.defineProperty(exports, "__esModule", { value: true });
var user_model_1 = require("./models/user.model");
var user_controller_1 = require("./controllers/user.controller");
var module_1 = require("../../_core/_base/module");
var profile_model_1 = require("./models/profile.model");
var profile_controller_1 = require("./controllers/profile.controller");
var UserModule = /** @class */ (function (_super) {
    __extends(UserModule, _super);
    function UserModule() {
        return _super.call(this, {
            controllers: [user_controller_1.UserController, profile_controller_1.default],
            models: [user_model_1.UserModel, profile_model_1.ProfileModel]
        }) || this;
    }
    return UserModule;
}(module_1.Module));
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map