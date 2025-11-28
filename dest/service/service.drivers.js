"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driversService = void 0;
const driver_types_1 = require("../routes/driver-types-and-enums/driver-types");
const drivers_repository_mongodb_1 = require("../repositories/drivers.repository.mongodb");
exports.driversService = {
    async findALl() {
        return drivers_repository_mongodb_1.driversRepository.findALl();
    },
    async findById(id) {
        if (id) {
            return drivers_repository_mongodb_1.driversRepository.findById(id) ?? null;
        }
        return undefined;
    },
    async createDriver(driver) {
        const newDriver = {
            ...driver,
            id: 1,
            status: driver_types_1.DriverStatus.Online,
            createdAt: new Date(),
        };
        return drivers_repository_mongodb_1.driversRepository.createDriver(newDriver);
    },
    async deleteAllDrivers() {
        drivers_repository_mongodb_1.driversRepository.deleteAllDrivers();
    },
};
