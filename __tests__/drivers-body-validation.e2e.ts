import request = require('supertest');
import express = require('express');
import { setupApp } from "../src/setup-app";
import { HttpStatus } from "../src/core/http-statuses";
import { DriverInputDto } from "../src/routes/driver-types-and-enums/driver-input-dto"
import {runDB} from "../src/db/mongo.db";

describe("Test input data validation", () => {
    const app = express();
    setupApp(app);

    const correctTestDriverData: DriverInputDto = {
        name: 'Valentin',
        phoneNumber: '123-456-7890',
        email: 'valentin@example.com',
        vehicleMake: 'BMW',
        vehicleModel: 'X5',
        vehicleYear: 2021,
        vehicleLicensePlate: 'ABC-123',
        vehicleDescription: null,
        vehicleFeatures: [],
    };

    // beforeAll(async () => {
    //     await runDB();
    //
    //     await request(app).delete('/api/testing/all-data').expect(HttpStatus.NoContent);
    // });

    it("This should not be registered in database", async() => {
        await runDB();

        const incorrectTestDriverData: DriverInputDto = {
            ...correctTestDriverData,
            name: '  ',
            phoneNumber: '  ',
            email: 'valentin  ple  com',
            vehicleMake: '  '};

        const result = await request(app)
            .post("/api/drivers")
            .set('Authorization', 'Basic ' + 'YWRtaW46cXdlcnR5')
            .send(incorrectTestDriverData);

        expect(result.status).toBe(HttpStatus.BadRequest);
        //expect(result.body.errorMessages.length).toBe(4);

        const driverListResponse = await request(app).get('/api/drivers');
        //expect(driverListResponse.body).toHaveLength(0);
    });

});