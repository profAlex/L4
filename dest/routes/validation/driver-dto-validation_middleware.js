"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverInputDtoValidation = void 0;
const express_validator_1 = require("express-validator");
const driver_types_1 = require("../driver-types-and-enums/driver-types");
const nameValidation = (0, express_validator_1.body)("name")
    .exists().withMessage("Name must be specified")
    .isString().withMessage("Incorrect name type (must be string)")
    .trim()
    .isLength({ min: 2, max: 30 }).withMessage("Name length must be between 2 and 30 symbols");
// неработающая версия с "param"
// const nameValidationV2 = param("name")
//     .exists().withMessage("Name must be specified")
//     .isString().withMessage("Incorrect name type (must be string")
//     .trim()
//     .isLength({min: 2, max: 30}).withMessage("Name length must be between 2 and 30 symbols");
const phoneNumberValidation = (0, express_validator_1.body)("phoneNumber")
    .exists().withMessage("Phone number must be specified")
    .isString().withMessage("Incorrect phone number type (must be string")
    .trim()
    .isLength({ min: 8, max: 15 }).withMessage("Phone length must be between 8 and 15 symbols");
const emailValidation = (0, express_validator_1.body)("email")
    .exists().withMessage("Email must be specified")
    .isString().withMessage("Incorrect email type (must be string")
    .trim()
    .isLength({ min: 5, max: 100 }).withMessage("Email length must be between 5 and 100 symbols")
    .isEmail().withMessage("Email has incorrect format");
const vehicleMakeValidation = (0, express_validator_1.body)('vehicleMake')
    .exists().withMessage('vehicleMake must be specified')
    .isString().withMessage('vehicleMake should be string')
    .trim()
    .isLength({ min: 3, max: 100 }).withMessage('Length of vehicleMake is not correct');
const vehicleModelValidation = (0, express_validator_1.body)('vehicleModel')
    .exists().withMessage('Vehicle Model must be specified')
    .isString().withMessage('vehicleModel should be string')
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('Length of vehicleModel is not correct');
const currentYear = new Date().getFullYear();
const vehicleYearValidation = (0, express_validator_1.body)("vehicleYear")
    .exists().withMessage('Vehicle year must be specified')
    .isInt({ min: 1980, max: currentYear }).withMessage("Vehicle year should be between 1980 and current year");
const vehicleLicensePlateValidation = (0, express_validator_1.body)('vehicleLicensePlate')
    .exists().withMessage('Vehicle License Plate should be specified')
    .isString().withMessage('vehicleLicensePlate type should be string')
    .trim()
    .isLength({ min: 6, max: 10 }).withMessage("Length of vehicleLicensePlate should be between 6 and 10 symbols");
const vehicleDescriptionValidation = (0, express_validator_1.body)('vehicleDescription')
    .optional({ nullable: true })
    .isString().withMessage("vehicleDescription type must be string")
    .trim()
    .isLength({ min: 10, max: 200 }).withMessage('Length of vehicleDescription should be between 10 and 200 symbols');
const vehicleFeaturesValidation = (0, express_validator_1.body)('vehicleFeatures')
    .isArray()
    .withMessage('vehicleFeatures should be array')
    .optional()
    .custom((vehicleFeatures) => {
    if (vehicleFeatures.length) {
        const validFeatures = Object.values(driver_types_1.VehicleFeature);
        vehicleFeatures.forEach((feature) => {
            if (!validFeatures.includes(feature)) {
                throw new Error('vehicleFeatures should contain values of VehicleFeature');
            }
        });
    }
    return true;
});
exports.driverInputDtoValidation = [
    nameValidation,
    phoneNumberValidation,
    emailValidation,
    vehicleMakeValidation,
    vehicleModelValidation,
    vehicleYearValidation,
    vehicleLicensePlateValidation,
    vehicleDescriptionValidation,
    vehicleFeaturesValidation,
];
// import {DriverInputDto} from "./driver.input-dto";
// import {ValidationError} from "../core/validation-error";
//
//
//
//
//
// const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//
// export const driverInputDtoValidation = (data: DriverInputDto) :ValidationError[] => {
//     const errors: ValidationError[] = [];
//
//     if(!data.name || typeof data.name !== 'string' || data.name.trim().length < 2 || data.name.trim().length > 15) {
//         errors.push({ field: 'name', message: 'Invalid name' });
//     }
//
//     if (!data.phoneNumber || typeof data.phoneNumber !== 'string' || data.phoneNumber.trim().length < 8 || data.phoneNumber.trim().length > 15) {
//         errors.push({ field: 'phoneNumber', message: 'Invalid phoneNumber' });
//     }
//
//     if (!data.email ||
//         typeof data.email !== 'string' ||
//         data.email.trim().length < 6 ||
//         data.email.trim().length > 50 ||
//         !EMAIL_REGEX.test(data.emaiValidationError,l)) {
//         errors.push({ field: 'email', message: 'Invalid email' });
//     }
//
//     if (!data.vehicleMake || typeof data.vehicleMake !== 'string' || data.vehicleMake.trim().length < 2 || data.vehicleMake.trim().length > 30) {
//         errors.push({ field: 'vehicleMake', message: 'Invalid vehicleMake' });
//     }
//
//     if (!data.vehicleModel || typeof data.vehicleModel !== 'string' || data.vehicleModel.trim().length < 2 || data.vehicleModel.trim().length > 30) {
//         errors.push({ field: 'vehicleModel', message: 'Invalid vehicleModel' });
//     }
//
//     if (!data.vehicleYear || typeof data.vehicleYear !== 'number' || data.vehicleYear < 1970 || data.vehicleYear > 2024) {
//         errors.push({ field: 'vehicleYear', message: 'Invalid vehicleYear' });
//     }
//
//     if (!data.vehicleLicensePlate || typeof data.vehicleLicensePlate !== 'string' || data.vehicleLicensePlate.trim().length < 2 || data.vehicleLicensePlate.trim().length > 30) {
//         errors.push({ field: 'vehicleLicensePlate', message: 'Invalid vehicleLicensePlate' });
//     }
//
//     if(data.vehicleDescription !== null && ((typeof data.vehicleDescription !== 'string' ||
//         data.vehicleDescription.trim().length < 10 ||
//         data.vehicleDescription.trim().length > 200))){
//             errors.push({ field: 'vehicleDescription', message: 'Invalid vehicleDescription' });
//     }
//
//     if(!Array.isArray(data.vehicleFeatures)){
//         errors.push({ field: 'vehicleFeatures', message: 'Invalid vehicleFeatures - this field must be an array' });
//     }
//     else if (data.vehicleFeatures.length) {
//         const existingFeatures = Object.values(data.vehicleFeatures);
//
//         if(data.vehicleFeatures.length > existingFeatures.length || data.vehicleFeatures.length < 1) {
//             errors.push({ field: 'vehicleFeatures', message: 'Invalid vehicleFeatures' });
//         }
//
//         for (const feature of data.vehicleFeatures) {
//             if (!existingFeatures.includes(feature)) {
//                 errors.push({
//                     field: 'features',
//                     message: 'Invalid vehicleFeature:' + feature,
//                 });
//                 break;
//             }
//         }
//     }
//
//     return errors;
// };
//
//
