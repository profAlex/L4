"use strict";
// import express, {Express, Request, Response} from "express";
//
// //import {driverRouter} from "./routers/driver.routes";
// // import {testingRouter} from "./routers/testing.routes";
// // import {setupSwagger} from "./swagger/setup-swagger";
// // import {DRIVERS_PATH, TESTING_PATH} from "./core/router-pathes";
//
// export const setupApp = (app: Express) => {
//     app.use(express.json()); // middleware для парсинга JSON в теле запроса
//
//     // app.use(DRIVERS_PATH, driverRouter);
//     // app.use(TESTING_PATH, testingRouter);
//
//     app.get("/", (req: Request, res: Response) => {
//         res.status(200).send("Hello my first BACK-END APP!");
//     });
//
//     //setupSwagger(app);
//
//     return app;
// };
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const express_1 = __importDefault(require("express"));
const router_pathes_1 = require("./core/router-pathes");
const driver_routes_1 = require("./routers/driver.routes");
const testing_routes_1 = require("./routers/testing.routes");
const setupApp = (app) => {
    app.use(express_1.default.json());
    app.use(router_pathes_1.DRIVERS_PATH, driver_routes_1.driverRouter);
    app.use(router_pathes_1.TESTING_PATH, testing_routes_1.testingRouter);
    app.get('/', (req, res) => {
        res.status(200).send("All good!");
    });
    // console.log('TEST');
    return app;
};
exports.setupApp = setupApp;
