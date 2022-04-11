import express from "express";
import { applicationError } from "./../constants/index";
import { Request, Response } from "express";
import { IpingResponse } from "../interfaces/index";

export class PingController {
  static async ping(
    req: Request,
    response: Response,
    next: express.NextFunction
  ): Promise<Response<any, Record<string, any>>> | undefined {
    try {
      let error: any;
      const { statusCode } = response;
      const apiResponse: IpingResponse = { success: true };
      let res: Response<any, Record<string, any>> | undefined;
      if (statusCode !== 200) {
        error = new Error(applicationError.unsuccessfulRequest(statusCode));
        return res.status(statusCode).json(error);
      }
      res = response.status(200).json(apiResponse);
      return res;
    } catch (error) {}
  }
}
