"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application_context_1 = require("../../../application.context");
var HttpException_1 = require("../../../_exceptions/HttpException");
function uploadMiddleware(req, res, next) {
    try {
        application_context_1.default.uploader.any()(req, res, function () {
            if ('files' in req) {
                next();
            }
            else {
                throw new HttpException_1.default(400, 'Invalid File');
            }
        });
    }
    catch (e) {
        console.log(e);
    }
}
exports.default = uploadMiddleware;
//# sourceMappingURL=uploader.middleware.js.map