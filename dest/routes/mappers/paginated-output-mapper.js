"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToDriverListPaginatedOutput = mapToDriverListPaginatedOutput;
function mapToDriverListPaginatedOutput(drivers, meta) {
    return {
        meta: {
            page: meta.pageNumber,
            pageSize: meta.pageSize,
            pageCount: Math.ceil(meta.totalCount / meta.pageSize),
            totalCount: meta.totalCount,
        },
        data: drivers.map((driver) => ({
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
        })),
    };
}
