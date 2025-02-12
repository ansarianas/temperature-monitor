import { Request, Response } from "express";
import mongoose from "mongoose";
import { io } from "socket.io-client";
import { HttpCodes, HttpMethods } from "../constants/http";
import config from "../utils/config";
import { asyncHandler } from "../utils/helper";
import { successHandler } from "../utils/response";

/**
 * @public GET /api/health/status
 */
export const healthStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const healthStatus: Record<string, boolean | string> = {
      timestamp: new Date().toISOString(),
    };

    try {
      await mongoose.connect(config.DB_URI, { serverSelectionTimeoutMS: 2000 });
      healthStatus["mongoDB"] = "Connected";
    } catch (error) {
      healthStatus["mongoDB"] = "Not Connected";
    }

    try {
      const socket = io(config.WS_URI, {
        transports: ["websocket"],
        timeout: 2000,
      });
      await new Promise((resolve, reject) => {
        socket.on("connect", () => resolve("Successfull"));
        socket.on("connect_error", (error) => reject(error));
      });
      healthStatus["webSocket"] = "Connected";
      socket.disconnect();
    } catch (error) {
      healthStatus["webSocket"] = "Not Connected";
    }

    const successMsg = "Health Check Completed";
    const data = { services: healthStatus };
    const response = successHandler(successMsg, HttpCodes.OK.code, data);
    
    return res.status(res.statusCode).send(response);
  },
  { apiEndpoint: "/api/health/status", method: HttpMethods.GET }
);
