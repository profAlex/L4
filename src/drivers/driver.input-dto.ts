import {VehicleFeature} from "./driver-types";

export type DriverInputDto = {
    name: string;
    phoneNumber: string;
    email: string;
    vehicleMake: string;
    vehicleModel: string;
    vehicleYear: number;
    vehicleLicensePlate: string;
    vehicleDescription: string | null;
    vehicleFeatures: VehicleFeature[];
};