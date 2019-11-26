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
var test_model_1 = require("./models/test.model");
var test_controller_1 = require("./controllers/test.controller");
var module_1 = require("./../../_core/_base/module");
var uploader_controller_1 = require("./controllers/uploader.controller");
var TestModule = /** @class */ (function (_super) {
    __extends(TestModule, _super);
    function TestModule() {
        return _super.call(this, {
            controllers: [test_controller_1.TestController, uploader_controller_1.default],
            models: [test_model_1.TestModel]
        }) || this;
    }
    return TestModule;
}(module_1.Module));
exports.TestModule = TestModule;
exports.default = TestModule;
//# sourceMappingURL=test.module.js.map