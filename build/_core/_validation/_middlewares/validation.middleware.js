"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validationMiddleware(type, skipMissingProperties) {
    if (skipMissingProperties === void 0) { skipMissingProperties = false; }
    return function (req, res, next) {
        validate(plainToClass(type, req.body), { skipMissingProperties: skipMissingProperties })
            .then(function (errors) {
            if (errors.length > 0) {
                var message = errors.map(function (error) { return Object.values(error.constraints); }).join(', ');
                next(new HttpException(400, message));
            }
            else {
                next();
            }
        });
    };
}
exports.default = validationMiddleware;
//# sourceMappingURL=validation.middleware.js.map