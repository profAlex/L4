import {Driver, DriverStatus, VehicleFeature} from "../drivers/driver-types";
import {driversRepository} from "../repositories/drivers.repository.mongodb";

export const driversService = {
    async findALl(): Promise<Driver[]> {
        return driversRepository.findALl();
    },

    async findById(id: number | null | undefined): Promise<Driver | null | undefined> {
        if (id) {
            return driversRepository.findById(id) ?? null;
        }

        return undefined;
    },

    async createDriver(driver: any): Promise<Driver> {

        const newDriver: Driver = {
            ...driver,
            id: 1,
            status: DriverStatus.Online,
            createdAt: new Date(),
        };

        return await driversRepository.createDriver(newDriver);

    },

    async deleteAllDrivers(): Promise<void> {
        driversRepository.deleteAllDrivers();
    },

};

