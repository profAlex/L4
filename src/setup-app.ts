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


import express, {Express, Request, Response} from "express";
import {DRIVERS_PATH, TESTING_PATH} from "./core/router-pathes";
import {driverRouter} from "./routes/driver.routes";
import {testingRouter} from "./routes/testing.routes";

export const setupApp = (app: Express) => {
    app.use(express.json());

    app.use(DRIVERS_PATH, driverRouter);
    app.use(TESTING_PATH, testingRouter);

    app.get('/', (req: Request, res: Response) => {
        res.status(200).send("All good!")
    });

    // console.log('TEST');
    return app;
};