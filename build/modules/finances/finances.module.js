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
var module_1 = require("../../_core/_base/module");
var earns_controller_1 = require("./controllers/earns.controller");
var expenses_controller_1 = require("./controllers/expenses.controller");
var earns_model_1 = require("./models/earns.model");
var expenses_model_1 = require("./models/expenses.model");
var FinancesModule = /** @class */ (function (_super) {
    __extends(FinancesModule, _super);
    function FinancesModule() {
        return _super.call(this, {
            controllers: [earns_controller_1.default, expenses_controller_1.default],
            models: [earns_model_1.EarnModel, expenses_model_1.ExpensesModel]
        }) || this;
    }
    return FinancesModule;
}(module_1.Module));
exports.FinancesModule = FinancesModule;
exports.default = FinancesModule;
//# sourceMappingURL=finances.module.js.map