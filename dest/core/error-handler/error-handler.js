"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainError = exports.RepositoryNotFoundError = void 0;
exports.errorsHandler = errorsHandler;
const http_statuses_1 = require("../http-statuses");
class RepositoryNotFoundError extends Error {
}
exports.RepositoryNotFoundError = RepositoryNotFoundError;
class DomainError extends Error {
    constructor(detail, code, source) {
        super(detail);
        this.code = code;
        this.source = source;
    }
}
exports.DomainError = DomainError;
// в таком виде ошибка которую мы сформировали внутри наших функций будет передана пользователю на сервере
const createErrorMessages = (errors) => {
    return {
        errors: errors.map((error) => ({
            status: error.status,
            detail: error.detail, //error message
            source: { pointer: error.source ?? '' }, //error field
            code: error.code ?? null, //domain error code
        })),
    };
};
function errorsHandler(error, res) {
    if (error instanceof RepositoryNotFoundError) {
        const httpStatus = http_statuses_1.HttpStatus.NotFound;
        res.status(httpStatus).send(createErrorMessages([
            {
                status: httpStatus,
                detail: error.message,
            },
        ]));
        return;
    }
    if (error instanceof DomainError) {
        const httpStatus = http_statuses_1.HttpStatus.UnprocessableEntity;
        res.status(httpStatus).send(createErrorMessages([
            {
                status: httpStatus,
                source: error.source,
                detail: error.message,
                code: error.code,
            },
        ]));
        return;
    }
    res.status(http_statuses_1.HttpStatus.InternalServerError);
    return;
}
