import request = require('supertest');
import express = require('express');
import { setupApp } from "../src/setup-app";
import { HttpStatus } from "../src/core/http-statuses";
import { DriverInputDto } from "../src/routes/driver-types-and-enums/driver-input-dto"
import {DriverStatus} from "../src/routes/driver-types-and-enums/driver-types";
import {runDB} from "../src/db/mongo.db";

describe("Test API", () => {


    // appStart();
    const app = express();
    setupApp(app);

    const testDriverData: DriverInputDto = {
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

    beforeAll(async () => {
        await runDB();
        const res = await request(app).delete('/api/testing/all-data');
        expect(res.status).toBe(HttpStatus.NoContent);
    });

    it("GET /api/ - should respond with a 200 and a starting message", async() => {
        //await runDB();

        const res = await request(app).get('/');
        expect(res.status).toBe(HttpStatus.Ok);
        expect(res.text).toBe("All good!");
    });

    it("POST drivers/ - should create a driver", async() => {
       //await runDB();

       const newDriver: DriverInputDto = {
           ...testDriverData
       };

       //console.log(newDriver);

       const newDriverResponse = await request(app)
           .post("/api/drivers/")
           .set('Authorization', 'Basic ' + 'YWRtaW46cXdlcnR5')
           .send(newDriver)
           .expect(HttpStatus.Created);

       expect(newDriverResponse.body.status).toBe(DriverStatus.Online);
    });

    it("GET /drivers - should return list of registered drivers", async() => {
        //await runDB();


        const newDriver: DriverInputDto = {
            ...testDriverData,
            name: 'Valentin2',
            phoneNumber: '111-222-3333',
        };

        const res = await request(app)
            .post("/api/drivers")
            .set('Authorization', 'Basic ' + 'YWRtaW46cXdlcnR5')
            .send(newDriver)
            .expect(HttpStatus.Created);

        const getDriversResponse = await request(app)
           .get("/api/drivers")
           .expect(HttpStatus.Ok);

        expect(getDriversResponse.body.data[0].attributes.name).toBe('Valentin');
        expect(getDriversResponse.body.data[0].attributes.phoneNumber).toBe('123-456-7890');

        expect(getDriversResponse.body.data[1].attributes.name).toBe('Valentin2');
        expect(getDriversResponse.body.data[1].attributes.phoneNumber).toBe('111-222-3333');

    });

    it('GET /drivers/:id - should return driver by id; ', async () => {
        //await runDB();


        const createResponse = await request(app)
            .post('/api/drivers')
            .set('Authorization', 'Basic ' + 'YWRtaW46cXdlcnR5')
            .send({ ...testDriverData, name: 'Another Driver' })
            .expect(HttpStatus.Created);

        const getResponse = await request(app)
            .get(`/api/drivers/${createResponse.body.id}`)
            .expect(HttpStatus.Ok);

        // const getResponse = await request(app).get("/api/drivers/3");

        expect(getResponse.body.name).toBe('Another Driver');

        expect(getResponse.body).toEqual({
            ...createResponse.body,
            id: expect.any(String),
            _id: expect.any(String),

            status: DriverStatus.Online,
            createdAt: expect.any(String),
        });
    });


    it('GET /drivers/?pageNumber=0&pageSize=5000&sortDirection=descendng&searchDriverNameTerm=John - general verification of correctness of transferring parameters into the functions; ', async () => {
        //await runDB();


        // const createResponse = await request(app)
        //     .post('/api/drivers')
        //     .set('Authorization', 'Basic ' + 'YWRtaW46cXdlcnR5')
        //     .send({ ...testDriverData, name: 'Another Driver' })
        //     .expect(HttpStatus.Created);

        const getResponse = await request(app)
            // .get("/api/drivers/3")
            .get(`/api/drivers/?
            pageNumber=2&
            pageSize=99&
            sortBy=name&
            sortDirection=descending&
            searchDriverNameTerm=John&
            searchDriverEmailTerm=test@example.com&
            searchVehicleMakeTerm=BMW`)
            .expect(HttpStatus.Ok);

        // const getResponse = await request(app).get("/api/drivers/3");

        // expect(getResponse.body.name).toBe('Another Driver');

        // expect(getResponse.body).toEqual({
        //     ...getResponse.body,
        //     id: expect.any(String),
        //     _id: expect.any(String),
        //
        //     status: DriverStatus.Online,
        //     createdAt: expect.any(String),
        // });
    });
});

