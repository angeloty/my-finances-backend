"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var profile_model_1 = require("../models/profile.model");
exports.profileModel = {
    id: null,
    ci: "6.419.206-5" + Math.random().toString(36).substring(7),
    firstName: 'Angel Rafael',
    lastName: 'Sanchez Napoles',
    gender: profile_model_1.Gender.MALE,
    birthday: new Date('07/13/1985')
};
exports.default = exports.profileModel;
//# sourceMappingURL=profile.fixture.js.map