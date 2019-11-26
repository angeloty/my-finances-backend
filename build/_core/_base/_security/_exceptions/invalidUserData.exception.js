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
var HttpException_1 = require("../../../_exceptions/HttpException");
var InvalidUserDataException = /** @class */ (function (_super) {
    __extends(InvalidUserDataException, _super);
    function InvalidUserDataException() {
        return _super.call(this, 400, 'Invalid User data provided') || this;
    }
    return InvalidUserDataException;
}(HttpException_1.default));
exports.default = InvalidUserDataException;
//# sourceMappingURL=invalidUserData.exception.js.map