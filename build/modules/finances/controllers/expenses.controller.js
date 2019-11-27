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
var entry_controller_1 = require("./entry.controller");
var expenses_service_1 = require("../services/expenses.service");
var ExpensesController = /** @class */ (function (_super) {
    __extends(ExpensesController, _super);
    function ExpensesController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExpensesController.prototype.getService = function () {
        return new expenses_service_1.ExpensesServices();
    };
    ExpensesController = __decorate([
        controller_decorator_1.Controller({ path: 'expenses' })
    ], ExpensesController);
    return ExpensesController;
}(entry_controller_1.default));
exports.ExpensesController = ExpensesController;
exports.default = ExpensesController;
//# sourceMappingURL=expenses.controller.js.map