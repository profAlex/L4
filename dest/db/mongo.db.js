"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverCollection = exports.client = void 0;
exports.runDB = runDB;
const mongodb_1 = require("mongodb");
const DB_NAME = 'drivers_db';
const DRIVER_COLLECTION_NAME = 'drivers_collection';
const URI = "mongodb+srv://admin:admin@learningcluster.f1zm90x.mongodb.net/?retryWrites=true&w=majority&appName=LearningCluster";
async function runDB() {
    exports.client = new mongodb_1.MongoClient(URI);
    const db = exports.client.db(DB_NAME);
    exports.driverCollection = db.collection(DRIVER_COLLECTION_NAME);
    try {
        await exports.client.connect();
        await db.command({ ping: 1 });
        console.log(`Connected to DB ${DB_NAME}`);
    }
    catch (error) {
        await exports.client.close();
        throw new Error(`Database not connected: ${error}`);
    }
}
