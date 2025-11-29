import {Driver, DriverStatus, VehicleFeature} from "../routes/driver-types-and-enums/driver-types";
import {driverCollection} from "../db/mongo.db";
import {ObjectId, WithId} from "mongodb";
import {InputDriverQuery} from "../routes/driver-types-and-enums/input-query/input-driver-query";


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
    async findALl(inputQueryDto: InputDriverQuery): Promise<{items: WithId<Driver>[]; totalCount: number}> {
        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
            searchDriverNameTerm,
            searchDriverEmailTerm,
            searchVehicleMakeTerm,
        } = inputQueryDto;

        const filter :any = {};
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

        if(!sortBy) {
            throw new Error();
        }

        const items = await driverCollection
            .find(filter)

            // "asc" (по возрастанию), то используется 1
            // "desc" — то -1 для сортировки по убыванию. - по алфавиту от Я-А, Z-A
            .sort({[sortBy]: sortDirection})

            // пропускаем определённое количество док. перед тем, как вернуть нужный набор данных.
            .skip(skip)

            // ограничивает количество возвращаемых документов до значения pageSize
            .limit(pageSize)
            .toArray();

        const totalCount = await driverCollection.countDocuments(filter);

        return {items, totalCount};
    },

    // async findMany() Promise<Driver[]> {
    //     const items = await driverCollection
    //         .find(filter)
    //         .sort({ [sortBy]: sortDirection })
    //         .skip(skip)
    //         .limit(pageSize)
    //         .toArray();
    // },

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

