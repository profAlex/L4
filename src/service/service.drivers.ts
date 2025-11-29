import {Driver, DriverStatus, VehicleFeature} from "../routes/driver-types-and-enums/driver-types";
import {driversRepository} from "../repositories/drivers.repository.mongodb";
import {InputDriverQuery} from "../routes/driver-types-and-enums/input-query/input-driver-query";
import {WithId} from "mongodb";

export const driversService = {
    async findALl(inputQueryDto: InputDriverQuery): Promise<{items: WithId<Driver>[]; totalCount: number}> {
        return driversRepository.findALl(inputQueryDto);
    },

    async findById(id: string | null | undefined): Promise<Driver | null | undefined> {
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

        return driversRepository.createDriver(newDriver);

    },

    async deleteAllDrivers(): Promise<void> {
        driversRepository.deleteAllDrivers();
    },

};

