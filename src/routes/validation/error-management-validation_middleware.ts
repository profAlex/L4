import {FieldValidationError, ValidationError, validationResult} from "express-validator";
import {ValidationErrorDto, ValidationErrorType} from "../../core/validation-error";
import {HttpStatus} from "../../core/http-statuses";
import { NextFunction, Request, Response } from 'express';


export const createErrorMessages = (errors: ValidationErrorType[]) :ValidationErrorDto=> {
    return { errorMessages: errors };
};

const formatErrors = (error: ValidationError): ValidationErrorType => {
    const expressError = error as unknown as FieldValidationError;

    return {
        field: expressError.path,
        message: expressError.msg,
    };
};

export const inputValidationResultMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const errors = validationResult(req).formatWith(formatErrors).array({ onlyFirstError: true });

    if (errors.length > 0) {

        // console.log(errors); //для отладки

        res.status(HttpStatus.BadRequest).json({ errorMessages: errors });
        return;
    }

    next();
};