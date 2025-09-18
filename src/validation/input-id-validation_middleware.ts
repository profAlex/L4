import { param } from "express-validator";

export const inputIdValidation = param('id')
    .exists().withMessage('ID must be specified')
    .trim()
    .isNumeric().withMessage('ID must be a numeric number')
    .isLength({ min: 1 }).withMessage('ID must not be empty')
