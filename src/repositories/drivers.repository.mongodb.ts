import {Driver, DriverStatus, VehicleFeature} from "../drivers/driver-types";
import {driverCollection} from "../db/mongo.db";
import {ObjectId} from "mongodb";


type driverCollectionStorageModel = {
    _id: ObjectId;
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    status: DriverStatus;
    vehicleMake: string; // e.g., Toyota
    vehicleModel: string; // e.g., Camry
    vehicleYear: number;
    vehicleLicensePlate: string;
    vehicleDescription: string | null;
    vehicleFeatures: VehicleFeature[];
    createdAt: Date;
};

const transformSingleDriverInCollectionToViewModel = (driverInStorage: driverCollectionStorageModel) => {
    return {
        id: driverInStorage.id,
        name: driverInStorage.name,
        phoneNumber: driverInStorage.phoneNumber,
        email: driverInStorage.email,
        status: driverInStorage.status,
        vehicleMake: driverInStorage.vehicleMake,
        vehicleModel: driverInStorage.vehicleModel,
        vehicleYear: driverInStorage.vehicleYear,
        vehicleLicensePlate: driverInStorage.vehicleLicensePlate,
        vehicleDescription: driverInStorage.vehicleDescription,
        vehicleFeatures: driverInStorage.vehicleFeatures,
        createdAt: driverInStorage.createdAt,
    } as Driver
};


export const driversRepository = {
    async findALl(): Promise<Driver[]> {
        return driverCollection.find({}).toArray();
    },

    async findMany() Promise<Driver[]> {
        const items = await driverCollection
            .find(filter)
            .sort({ [sortBy]: sortDirection })
            .skip(skip)
            .limit(pageSize)
            .toArray();
    },

    async findById(id: string | null | undefined): Promise<Driver | null | undefined> {
        if (typeof(id)=== "string" && ObjectId.isValid(id)) {
            return driverCollection.findOne({id: id}) ?? null;
        }

        return undefined;
    },

    async createDriver(driver: any): Promise<Driver> {
        // const docCount = await driverCollection.countDocuments();

        const tempId = new ObjectId();

        // if(docCount > 0){
        //
        //     const lastDoc: Driver[] = await driverCollection
        //         .find()
        //         .skip(docCount - 1)
        //         .limit(1)
        //         .toArray();
        driver._id = tempId;
        driver.id = tempId.toString();
        // }


        await driverCollection.insertOne(driver);

        return transformSingleDriverInCollectionToViewModel(driver);
    },

    async deleteAllDrivers(): Promise<void> {
        driverCollection.deleteMany({});
    },

};

