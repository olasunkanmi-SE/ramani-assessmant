import { PingController } from "./../../controllers/ping-controller";
import express from "express";
export const pingRouter = express.Router();
//Ping the API
pingRouter.get("/", PingController.ping);
