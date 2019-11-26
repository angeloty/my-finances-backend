"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = function (req, res, next) {
    console.log("Logged  " + req.url + "  " + req.method + " -- " + new Date());
    next();
};
//# sourceMappingURL=logger.middleware.js.map