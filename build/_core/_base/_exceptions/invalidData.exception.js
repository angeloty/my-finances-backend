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
var HttpException_1 = require("../../_exceptions/HttpException");
var InvalidModelDataException = /** @class */ (function (_super) {
    __extends(InvalidModelDataException, _super);
    function InvalidModelDataException(field) {
        var _this = _super.call(this, 400, "Invalid model data at field: " + field) || this;
        _this.field = field;
        return _this;
    }
    return InvalidModelDataException;
}(HttpException_1.default));
exports.InvalidModelDataException = InvalidModelDataException;
exports.default = InvalidModelDataException;
//# sourceMappingURL=invalidData.exception.js.map