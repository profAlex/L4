"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewDriver = exports.getDriverById = exports.getDriversList = void 0;
const http_statuses_1 = require("../core/http-statuses");
// import {Driver, DriverStatus} from "../drivers/driver-types";
const drivers_repository_mongodb_1 = require("../repositories/drivers.repository.mongodb");
const getDriversList = async (req, res) => {
    const driversList = await drivers_repository_mongodb_1.driversRepository.findALl();
    res.status(200).json(driversList);
};
exports.getDriversList = getDriversList;
const getDriverById = async (req, res) => {
    const driver = await drivers_repository_mongodb_1.driversRepository.findById(+req.params.id);
    if (!driver) {
        res.status(404).send({ message: "Driver not found" });
        return;
    }
    res.status(http_statuses_1.HttpStatus.Ok).send(driver);
};
exports.getDriverById = getDriverById;
const createNewDriver = async (req, res) => {
    const newDriver = await drivers_repository_mongodb_1.driversRepository.createDriver(req.body);
    res.status(201).send(newDriver);
};
exports.createNewDriver = createNewDriver;
