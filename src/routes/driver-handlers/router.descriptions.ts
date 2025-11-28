import {Request, Response} from "express";
// import {driversDb} from "../db/mock-data";
import {ValidationErrorType} from "../../core/validation-error";
import {driverInputDtoValidation} from "../validation/driver-dto-validation_middleware";
import {HttpStatus} from "../../core/http-statuses";
// import {Driver, DriverStatus} from "../drivers/driver-types";
import {driversService} from "../../service/service.drivers";
import {InputDriverQuery} from "../driver-types-and-enums/input-query/input-driver-query";
import {matchedData} from "express-validator";


export const getDriversList = async (req: Request<{}, {}, {}, InputDriverQuery>, res: Response) => {

    // console.log("HERE");
    const sanitizedQuery = matchedData<InputDriverQuery>(req, {
        locations: ['query'],
        includeOptionals: true,
    }); //утилита для извечения трансформированных значений после валидатара
    //в req.query остаются сырые квери параметры (строки)

    // console.log(sanitizedQuery.pageNumber);
    // console.log(sanitizedQuery.pageSize);
    //
    // console.log(sanitizedQuery.sortDirection);
    // console.log(sanitizedQuery.searchDriverEmailTerm);

    console.log(req.query);
    console.log(sanitizedQuery);

    const driversList = await driversService.findALl()
    res.status(200).json(driversList);
};

export const getDriverById = async (req: Request, res: Response) => {
    const driver = await driversService.findById(req.params.id);

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