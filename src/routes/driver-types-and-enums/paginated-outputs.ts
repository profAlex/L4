export type DriverDataOutput = {
    type: string;
    id: string;
    attributes: {
        name: string;
        phoneNumber: string;
        email: string;
        vehicleMake: string; // e.g., Toyota
        vehicleModel: string; // e.g., Camry
        createdAt: Date;
    };
};

export type PaginatedOutput = {
    page: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
};

export type DriverListPaginatedOutput = {
    meta: PaginatedOutput;
    data: DriverDataOutput[];
};