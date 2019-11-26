"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_model_1 = require("./../../_auth/_models/user.model");
exports.securityContext = {
    userModel: user_model_1.BaseUserModel,
    set: function (conf) {
        this.userModel = conf.userModel;
    }
};
exports.default = exports.securityContext;
//# sourceMappingURL=security.context.js.map