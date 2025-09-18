"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = require("express");
const drivers_repository_mongodb_1 = require("../repositories/drivers.repository.mongodb");
// import {driversDb} from "../db/mock-data";
exports.testingRouter = (0, express_1.Router)();
exports.testingRouter.delete('/all-data', async (req, res) => {
    await drivers_repository_mongodb_1.driversRepository.deleteAllDrivers();
    res.sendStatus(204);
});
