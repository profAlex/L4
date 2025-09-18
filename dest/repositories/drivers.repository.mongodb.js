"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driversRepository = void 0;
const mongo_db_1 = require("../db/mongo.db");
exports.driversRepository = {
    async findALl() {
        return mongo_db_1.driverCollection.find({}).toArray();
    },
    async findById(id) {
        if (id) {
            return mongo_db_1.driverCollection.findOne({ id: id }) ?? null;
        }
        return undefined;
    },
    async createDriver(driver) {
        const docCount = await mongo_db_1.driverCollection.countDocuments();
        if (docCount > 0) {
            const lastDoc = await mongo_db_1.driverCollection
                .find()
                .skip(docCount - 1)
                .limit(1)
                .toArray();
            driver.id = lastDoc[0].id + 1;
        }
        await mongo_db_1.driverCollection.insertOne(driver);
        return driver;
    },
    async deleteAllDrivers() {
        mongo_db_1.driverCollection.deleteMany({});
    },
};
