import {Router} from "express";
import {Request, Response} from "express";
import {driversRepository} from "../repositories/drivers.repository.mongodb";
// import {driversDb} from "../db/mock-data";

export const testingRouter = Router();

testingRouter.delete('/all-data', async (req: Request, res: Response) => {

    await driversRepository.deleteAllDrivers();
    res.sendStatus(204);

});