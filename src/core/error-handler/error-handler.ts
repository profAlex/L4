import {HttpStatus} from "../http-statuses";
import { Response } from 'express';

export class RepositoryNotFoundError extends Error {}

export class DomainError extends Error {
    constructor(
        detail: string,
        public readonly code: string,
        public readonly source?: string,
    ) {
        super(detail);
    }
}

type ValidationErrorOutput = {
    status: HttpStatus;
    detail: string;
    source: { pointer: string };
    code: string | null;
};

type ValidationErrorType = {
    status: HttpStatus;
    detail: string;
    source?: string;
    code?: string;
};

type ValidationErrorListOutput = { errors: ValidationErrorOutput[] };


// в таком виде ошибка которую мы сформировали внутри наших функций будет передана пользователю на сервере
const createErrorMessages = (
    errors: ValidationErrorType[],
): ValidationErrorListOutput => {
    return {
        errors: errors.map((error) => ({
            status: error.status,
            detail: error.detail, //error message
            source: { pointer: error.source ?? '' }, //error field
            code: error.code ?? null, //domain error code
        })),
    };
};


export function errorsHandler(error: unknown, res: Response): void {
    if (error instanceof RepositoryNotFoundError) {
        const httpStatus = HttpStatus.NotFound;

        res.status(httpStatus).send(
            createErrorMessages([
                {
                    status: httpStatus,
                    detail: error.message,
                },
            ]),
        );

        return;
    }

    if (error instanceof DomainError) {
        const httpStatus = HttpStatus.UnprocessableEntity;

        res.status(httpStatus).send(
            createErrorMessages([
                {
                    status: httpStatus,
                    source: error.source,
                    detail: error.message,
                    code: error.code,
                },
            ]),
        );

        return;
    }

    res.status(HttpStatus.InternalServerError);
    return;
}