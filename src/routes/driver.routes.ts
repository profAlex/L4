import {Router} from "express";
// import {Request, Response} from "express";
// import {driversDb} from "../db/mock-data";
// import {Driver, DriverStatus} from "../drivers/driver-types";
// import {driverInputDtoValidation} from "../drivers/driver-body-validation";
// import {ValidationError} from "../core/validation-error";
// import {HttpStatus} from "../core/http-statuses";
import {createNewDriver, getDriverById, getDriversList} from "./driver-handlers/router.descriptions";
import {inputIdValidation} from "./validation/input-id-validation_middleware";
import {inputValidationResultMiddleware} from "./validation/error-management-validation_middleware";
import {driverInputDtoValidation} from "./validation/driver-dto-validation_middleware";
import {superAdminGuardMiddleware} from "./validation/base64-auth-guard_middleware";

export const driverRouter = Router();

driverRouter.get("/", getDriversList);
driverRouter.get("/:id", inputIdValidation, inputValidationResultMiddleware, getDriverById);
driverRouter.post("/", superAdminGuardMiddleware, driverInputDtoValidation, inputValidationResultMiddleware, createNewDriver);
