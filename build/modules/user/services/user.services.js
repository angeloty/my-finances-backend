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
var user_service_1 = require("./../../../_core/_auth/_services/user.service");
var user_model_1 = require("../models/user.model");
var UserService = /** @class */ (function (_super) {
    __extends(UserService, _super);
    function UserService() {
        var _this = _super.call(this, user_model_1.UserModel) || this;
        _this.relations = ['profile'];
        return _this;
    }
    return UserService;
}(user_service_1.BaseUserService));
exports.UserService = UserService;
//# sourceMappingURL=user.services.js.map