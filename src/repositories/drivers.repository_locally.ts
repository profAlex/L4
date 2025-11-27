// import {Driver, DriverStatus, VehicleFeature} from "../drivers/driver-types";
//
// const driversDb = {
//     drivers: <Driver[]>[
//         {
//             id: 1,
//             name: 'Ivan Rider',
//             phoneNumber: '1234567890',
//             email: 'ivanrider@email.com',
//             status: DriverStatus.OnOrder,
//             vehicleMake: 'BMW',
//             vehicleModel: 'Cabrio',
//             vehicleYear: 2014,
//             vehicleLicensePlate: 'R1232JKO',
//             vehicleDescription: null,
//             vehicleFeatures: [VehicleFeature.ChildSeat, VehicleFeature.PetFriendly],
//             createdAt: new Date()
//         },
//         {
//             id: 2,
//             name: 'Dima Trader',
//             phoneNumber: '9876543210',
//             email: 'dimatrader@email.com',
//             status: DriverStatus.OnOrder,
//             vehicleMake: 'BMW',
//             vehicleModel: 'Cabrio',
//             vehicleYear: 2018,
//             vehicleLicensePlate: 'K5634BOT',
//             vehicleDescription: null,
//             vehicleFeatures: [],
//             createdAt: new Date()
//         }
//     ]
// };
//
//
//
// export const driversRepository = {
//     async findALl(): Promise<Driver[]> {
//         return driversDb.drivers;
//     },
//
//     async findById(id: number | null | undefined): Promise<Driver | null | undefined> {
//         if (id) {
//             return driversDb.drivers.find((d) => d.id === id) ?? null;
//         }
//
//         return undefined;
//     },
//
//     async createDriver(driver: any): Promise<Driver> {
//         const newDriver: Driver = {
//             ...driver,
//             id: driversDb.drivers.length ? driversDb.drivers[driversDb.drivers.length - 1].id + 1 : 1,
//             status: DriverStatus.Online,
//             createdAt: new Date(),
//         };
//
//         driversDb.drivers.push(newDriver);
//
//         return newDriver;
//     },
//
//     async deleteAllDrivers(): Promise<void> {
//         driversDb.drivers = [];
//     },
//
// };
//
