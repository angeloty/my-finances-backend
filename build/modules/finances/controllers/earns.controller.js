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
Object.defineProperty(exports, "__esModule", { value: true });
var controller_decorator_1 = require("../../../_core/_base/_controller/_decorators/controller.decorator");
var earns_service_1 = require("../services/earns.service");
var entry_controller_1 = require("./entry.controller");
var EarnsController = /** @class */ (function (_super) {
    __extends(EarnsController, _super);
    function EarnsController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EarnsController.prototype.getService = function () {
        return new earns_service_1.EarnsService();
    };
    EarnsController = __decorate([
        controller_decorator_1.Controller({ path: 'earns' })
    ], EarnsController);
    return EarnsController;
}(entry_controller_1.default));
exports.EarnsController = EarnsController;
exports.default = EarnsController;
//# sourceMappingURL=earns.controller.js.map