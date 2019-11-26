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
var currency_model_1 = require("./models/currency.model");
var CommonModule = /** @class */ (function (_super) {
    __extends(CommonModule, _super);
    function CommonModule() {
        return _super.call(this, {
            controllers: [],
            models: [currency_model_1.CurrencyModel]
        }) || this;
    }
    return CommonModule;
}(module_1.Module));
exports.CommonModule = CommonModule;
exports.default = CommonModule;
//# sourceMappingURL=common.module.js.map