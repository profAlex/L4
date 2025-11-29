"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewDriver = exports.getDriverById = exports.getDriversList = void 0;
const http_statuses_1 = require("../../core/http-statuses");
// import {Driver, DriverStatus} from "../drivers/driver-types";
const service_drivers_1 = require("../../service/service.drivers");
const express_validator_1 = require("express-validator");
const getDriversList = async (req, res) => {
    // console.log("HERE");
    const sanitizedQuery = (0, express_validator_1.matchedData)(req, {
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
    const driversList = await service_drivers_1.driversService.findALl(sanitizedQuery);
    res.status(200).json(driversList);
};
exports.getDriversList = getDriversList;
const getDriverById = async (req, res) => {
    const driver = await service_drivers_1.driversService.findById(req.params.id);
    if (!driver) {
        res.status(404).send({ message: "Driver not found" });
        return;
    }
    res.status(http_statuses_1.HttpStatus.Ok).send(driver);
};
exports.getDriverById = getDriverById;
const createNewDriver = async (req, res) => {
    const newDriver = await service_drivers_1.driversService.createDriver(req.body);
    res.status(201).send(newDriver);
};
exports.createNewDriver = createNewDriver;
