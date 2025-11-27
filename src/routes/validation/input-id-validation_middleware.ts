import { param } from "express-validator";

export const inputIdValidation = param('id')
    .exists().withMessage('ID must be specified')
    .trim()
    .isString().withMessage('ID must be of type string')
    .isLength({ min: 1 }).withMessage('ID must not be empty')


