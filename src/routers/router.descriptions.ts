import {Request, Response} from "express";
// import {driversDb} from "../db/mock-data";
import {ValidationErrorType} from "../core/validation-error";
import {driverInputDtoValidation} from "../validation/driver-dto-validation_middleware";
import {HttpStatus} from "../core/http-statuses";
// import {Driver, DriverStatus} from "../drivers/driver-types";
import {driversRepository} from "../repositories/drivers.repository.mongodb";


export const getDriversList = async (req: Request, res: Response) => {
    const driversList = await driversRepository.findALl()
    res.status(200).json(driversList);
};

export const getDriverById = async (req: Request, res: Response) => {
    const driver = await driversRepository.findById(+req.params.id);

    if(!driver) {
        res.status(404).send({ message: "Driver not found" });
        return;
    }

    res.status(HttpStatus.Ok).send(driver);
};

export const createNewDriver = async (req: Request, res: Response) => {

    const newDriver = await driversRepository.createDriver(req.body);
    res.status(201).send(newDriver);
};