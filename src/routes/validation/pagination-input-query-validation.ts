

/*

pageNumber
pageSize
sortBy
sortDirection
*/


import {Driver} from "../../drivers/driver-types";
import {SortDirection} from "../../core/sorting-direction-mongo";
import {NextFunction} from "express";
import {query, ValidationChain} from "express-validator";

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_SORT_BY = 'createdAt';
const DEFAULT_SORT_DIRECTION = SortDirection.Ascending;




export function paginationInputQueryValidation<T extends string>(sortListEnumSent: Record<string,T>): ValidationChain[] {
    const allowedFields = Object.keys(sortListEnumSent);
    return [
        query('pageNumber')
            .default(DEFAULT_PAGE_NUMBER)
            .isInt({ min: 1 })
            .withMessage('Page number must be a positive integer')
            .toInt(),

    ];
}