"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputIdValidation = void 0;
const express_validator_1 = require("express-validator");
exports.inputIdValidation = (0, express_validator_1.param)('id')
    .exists().withMessage('ID must be specified')
    .trim()
    .isNumeric().withMessage('ID must be a numeric number')
    .isLength({ min: 1 }).withMessage('ID must not be empty');
