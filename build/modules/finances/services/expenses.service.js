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
var application_context_1 = require("../../../_core/application.context");
var expenses_model_1 = require("../models/expenses.model");
var entry_services_1 = require("./entry.services");
var ExpensesServices = /** @class */ (function (_super) {
    __extends(ExpensesServices, _super);
    function ExpensesServices() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExpensesServices.prototype.getRepository = function () {
        return application_context_1.default.connection.getRepository(expenses_model_1.ExpensesModel);
    };
    return ExpensesServices;
}(entry_services_1.EntryService));
exports.ExpensesServices = ExpensesServices;
//# sourceMappingURL=expenses.service.js.map