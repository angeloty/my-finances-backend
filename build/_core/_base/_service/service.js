"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Service = /** @class */ (function () {
    function Service(conn) {
        this.connection = conn;
    }
    Service.prototype.getRepository = function (modelClass) {
        try {
            this.repository = this.connection.getRepository(modelClass);
            return this.repository;
        }
        catch (e) {
            throw e;
        }
    };
    return Service;
}());
exports.Service = Service;
//# sourceMappingURL=service.js.map