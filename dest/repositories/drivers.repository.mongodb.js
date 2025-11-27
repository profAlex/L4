"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driversRepository = void 0;
const mongo_db_1 = require("../db/mongo.db");
const mongodb_1 = require("mongodb");
const transformSingleDriverInCollectionToViewModel = (driverInStorage) => {
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
    };
};
exports.driversRepository = {
    async findALl() {
        return mongo_db_1.driverCollection.find({}).toArray();
    },
    async findById(id) {
        if (typeof (id) === "string" && mongodb_1.ObjectId.isValid(id)) {
            return mongo_db_1.driverCollection.findOne({ id: id }) ?? null;
        }
        return undefined;
    },
    async createDriver(driver) {
        // const docCount = await driverCollection.countDocuments();
        const tempId = new mongodb_1.ObjectId();
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
        await mongo_db_1.driverCollection.insertOne(driver);
        return transformSingleDriverInCollectionToViewModel(driver);
    },
    async deleteAllDrivers() {
        mongo_db_1.driverCollection.deleteMany({});
    },
};
