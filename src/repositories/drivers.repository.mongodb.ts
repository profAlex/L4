import {Driver, DriverStatus, VehicleFeature} from "../drivers/driver-types";
import {driverCollection} from "../db/mongo.db";

export const driversRepository = {
    async findALl(): Promise<Driver[]> {
        return driverCollection.find({}).toArray();
    },

    async findById(id: number | null | undefined): Promise<Driver | null | undefined> {
        if (id) {
            return driverCollection.findOne({id: id}) ?? null;
        }

        return undefined;
    },

    async createDriver(driver: any): Promise<Driver> {
        const docCount = await driverCollection.countDocuments();

        if(docCount > 0){

            const lastDoc: Driver[] = await driverCollection
                .find()
                .skip(docCount - 1)
                .limit(1)
                .toArray();

            driver.id = lastDoc[0].id + 1;
        }

        await driverCollection.insertOne(driver);

        return driver;
    },

    async deleteAllDrivers(): Promise<void> {
        driverCollection.deleteMany({});
    },

};

