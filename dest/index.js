"use strict";
// import express from "express";
// import { setupApp } from "./setup-app";
//
// // создание приложения
// const app = express();
// setupApp(app);
//
// // порт приложения
// const PORT = process.env.PORT || 3004;
//
// // запуск приложения
// app.listen(PORT, () => {
//     console.log(`Example app listening on port ${PORT}`);
// });
//
// module.exports = app;   //невозможно удалить, т.к. verсel выдает 500 ошибку после билда
//                         // export const app = express(); не работает с vercel
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appStart = void 0;
const express_1 = __importDefault(require("express"));
const setup_app_1 = require("./setup-app");
const mongo_db_1 = require("./db/mongo.db");
const app = (0, express_1.default)();
(0, setup_app_1.setupApp)(app);
const PORT = process.env.PORT || 3004;
const appStart = async () => {
    await (0, mongo_db_1.runDB)();
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
};
exports.appStart = appStart;
(0, exports.appStart)();
module.exports = app;
