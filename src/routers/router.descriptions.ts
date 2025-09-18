import {Request, Response} from "express";
// import {driversDb} from "../db/mock-data";
import {ValidationErrorType} from "../core/validation-error";
import {driverInputDtoValidation} from "../validation/driver-dto-validation_middleware";
import {HttpStatus} from "../core/http-statuses";
// import {Driver, DriverStatus} from "../drivers/driver-types";
import {driversService} from "../service/service.drivers";


export const getDriversList = async (req: Request, res: Response) => {
    const driversList = await driversService.findALl()
    res.status(200).json(driversList);
};

export const getDriverById = async (req: Request, res: Response) => {
    const driver = await driversService.findById(+req.params.id);

    if(!driver) {
        res.status(404).send({ message: "Driver not found" });
        return;
    }

    res.status(HttpStatus.Ok).send(driver);
};

export const createNewDriver = async (req: Request, res: Response) => {

    const newDriver = await driversService.createDriver(req.body);
    res.status(201).send(newDriver);
};