import {WithId} from "mongodb";
import {Driver} from "../driver-types-and-enums/driver-types";
import {DriverDataOutput, DriverListPaginatedOutput} from "../driver-types-and-enums/paginated-outputs";

export function mapToDriverListPaginatedOutput(
    drivers: WithId<Driver>[],
    meta: { pageNumber: number; pageSize: number; totalCount: number },
): DriverListPaginatedOutput {
    return {
        meta: {
            page: meta.pageNumber,
            pageSize: meta.pageSize,
            pageCount: Math.ceil(meta.totalCount / meta.pageSize),
            totalCount: meta.totalCount,
        },
        data: drivers.map(
            (driver): DriverDataOutput => ({
                type: 'Driver',
                id: driver._id.toString(),
                attributes: {
                    name: driver.name,
                    phoneNumber: driver.phoneNumber,
                    email: driver.email,
                    vehicleMake: driver.vehicleMake, // e.g., Toyota
                    vehicleModel: driver.vehicleModel,
                    createdAt: driver.createdAt,
                },
            }),
        ),
    };
}