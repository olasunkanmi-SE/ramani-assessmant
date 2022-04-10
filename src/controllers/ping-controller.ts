import { applicationError } from "./../constants/index";
import { Request, Response } from "express";
import { pingResponse } from "./../models/index";

export class PingController {
  static async ping(
    req: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>>> | undefined {
    try {
      let error: any;
      const { statusCode } = response;
      const apiResponse: pingResponse = { success: true };
      let res: Response<any, Record<string, any>> | undefined;
      if (statusCode !== 200) {
        error = new Error(applicationError.unsuccessfulRequest(statusCode));
        return error;
      } else {
        res = response.status(200).json(apiResponse);
      }
      return res;
    } catch (error) {}
  }
}
