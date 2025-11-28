"use strict";
/*
Структура тела запроса к эндпоинту с помощью операции get:
    pageNumber
    pageSize
    sortBy
    sortDirection
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationInputQueryValidation = paginationInputQueryValidation;
const sorting_direction_mongo_1 = require("../driver-types-and-enums/sorting-direction-mongo");
const express_validator_1 = require("express-validator");
const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_SORT_BY = 'createdAt';
const DEFAULT_SORT_DIRECTION = sorting_direction_mongo_1.CustomSortDirection.Ascending;
function paginationInputQueryValidation(sortListEnumSent) {
    const allowedFields = Object.values(sortListEnumSent);
    return [
        (0, express_validator_1.query)('pageNumber')
            .default(DEFAULT_PAGE_NUMBER)
            .isInt({ min: 1 })
            .withMessage('Page number must be a positive integer')
            .toInt(),
        (0, express_validator_1.query)('pageSize')
            .default(DEFAULT_PAGE_SIZE)
            .isInt({ min: 1, max: 100 })
            .withMessage('Page size must be a positive integer between 1 and 100')
            .toInt(),
        (0, express_validator_1.query)('sortBy')
            .default(DEFAULT_SORT_BY)
            .isIn(allowedFields)
            .withMessage(`Invalid sort field. Must be of the following: ${allowedFields.join(', ')}`),
        (0, express_validator_1.query)('sortDirection')
            .default(DEFAULT_SORT_DIRECTION)
            .isIn(Object.values(sorting_direction_mongo_1.CustomSortDirection))
            .withMessage(`Sort direction must be of the following: ${Object.values(sorting_direction_mongo_1.CustomSortDirection).join(', ')}`),
        (0, express_validator_1.query)('searchDriverNameTerm')
            .optional() // делаем поле опциональным
            .isString()
            .withMessage('Search term must be a string'),
        (0, express_validator_1.query)('searchDriverEmailTerm')
            .optional() // делаем поле опциональным
            .isString()
            .withMessage('Search term must be a string'),
        (0, express_validator_1.query)('searchVehicleMakeTerm')
            .optional() // делаем поле опциональным
            .isString()
            .withMessage('Search term must be a string'),
    ];
}
