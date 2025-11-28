import {Collection, Db, MongoClient} from "mongodb";
import {Driver} from "../routes/driver-types-and-enums/driver-types";

const DB_NAME = 'drivers_db';
const DRIVER_COLLECTION_NAME = 'drivers_collection';
const URI = "mongodb+srv://admin:admin@learningcluster.f1zm90x.mongodb.net/?retryWrites=true&w=majority&appName=LearningCluster";

export let client: MongoClient;
export let driverCollection: Collection<Driver>;

export async function runDB() {
    client = new MongoClient(URI);
    const db: Db = client.db(DB_NAME);
    driverCollection = db.collection<Driver>(DRIVER_COLLECTION_NAME);

    try {
        await client.connect();
        await db.command({ping: 1});
        console.log(`Connected to DB ${DB_NAME}`);
    }
    catch (error) {
        await client.close();
        throw new Error(`Database not connected: ${error}`);
    }
}