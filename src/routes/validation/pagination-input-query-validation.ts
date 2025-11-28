/*
Структура тела запроса к эндпоинту с помощью операции get:
    pageNumber
    pageSize
    sortBy
    sortDirection
*/

import {CustomSortDirection} from "../driver-types-and-enums/sorting-direction-mongo";
import {query, ValidationChain} from "express-validator";

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_SORT_BY = 'createdAt';
const DEFAULT_SORT_DIRECTION = CustomSortDirection.Ascending;


export function paginationInputQueryValidation<T extends string>(
    sortListEnumSent: Record<string,T>
): ValidationChain[] {
    const allowedFields = Object.values(sortListEnumSent);

    return [
        query('pageNumber')
            .default(DEFAULT_PAGE_NUMBER)
            .isInt({ min: 1 })
            .withMessage('Page number must be a positive integer')
            .toInt(),

        query('pageSize')
            .default(DEFAULT_PAGE_SIZE)
            .isInt({ min: 1, max: 100 })
            .withMessage('Page size must be a positive integer between 1 and 100')
            .toInt(),

        query('sortBy')
            .default(DEFAULT_SORT_BY)
            .isIn(allowedFields)
            .withMessage(`Invalid sort field. Must be of the following: ${allowedFields.join(', ')}`),

        query('sortDirection')
            .default(DEFAULT_SORT_DIRECTION)
            .isIn(Object.values(CustomSortDirection))
            .withMessage(`Sort direction must be of the following: ${Object.values(CustomSortDirection).join(', ')}`),

        query('searchDriverNameTerm')
            .optional()  // делаем поле опциональным
            .isString()
            .withMessage('Search term must be a string'),

        query('searchDriverEmailTerm')
            .optional()  // делаем поле опциональным
            .isString()
            .withMessage('Search term must be a string'),

        query('searchVehicleMakeTerm')
            .optional()  // делаем поле опциональным
            .isString()
            .withMessage('Search term must be a string'),

    ];
}