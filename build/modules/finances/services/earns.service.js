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
var earns_model_1 = require("../models/earns.model");
var entry_services_1 = require("./entry.services");
var EarnsService = /** @class */ (function (_super) {
    __extends(EarnsService, _super);
    function EarnsService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EarnsService.prototype.getRepository = function () {
        return application_context_1.default.connection.getRepository(earns_model_1.EarnModel);
    };
    return EarnsService;
}(entry_services_1.EntryService));
exports.EarnsService = EarnsService;
//# sourceMappingURL=earns.service.js.map