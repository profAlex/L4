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
    async findALl(inputQueryDto) {
        const { pageNumber, pageSize, sortBy, sortDirection, searchDriverNameTerm, searchDriverEmailTerm, searchVehicleMakeTerm, } = inputQueryDto;
        const filter = {};
        const skip = (pageNumber - 1) * pageSize;
        if (searchDriverNameTerm || searchDriverEmailTerm) {
            filter.$or = [];
            if (searchDriverNameTerm) {
                //встроенные операторы mongodb $regex и $options, 'i' для игнорирования регистра
                filter.$or.push({ name: { $regex: searchDriverNameTerm, $options: 'i' } });
            }
            if (searchDriverEmailTerm) {
                filter.$or.push({ email: { $regex: searchDriverEmailTerm, $options: 'i' } });
            }
        }
        if (searchVehicleMakeTerm) {
            filter['vehicle.make'] = { $regex: searchVehicleMakeTerm, $options: 'i' };
        }
        if (!sortBy) {
            throw new Error();
        }
        const items = await mongo_db_1.driverCollection
            .find(filter)
            // "asc" (по возрастанию), то используется 1
            // "desc" — то -1 для сортировки по убыванию. - по алфавиту от Я-А, Z-A
            .sort({ [sortBy]: sortDirection })
            // пропускаем определённое количество док. перед тем, как вернуть нужный набор данных.
            .skip(skip)
            // ограничивает количество возвращаемых документов до значения pageSize
            .limit(pageSize)
            .toArray();
        const totalCount = await mongo_db_1.driverCollection.countDocuments(filter);
        return { items, totalCount };
    },
    // async findMany() Promise<Driver[]> {
    //     const items = await driverCollection
    //         .find(filter)
    //         .sort({ [sortBy]: sortDirection })
    //         .skip(skip)
    //         .limit(pageSize)
    //         .toArray();
    // },
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
