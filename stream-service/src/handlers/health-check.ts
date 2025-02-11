import type {
  Context,
  APIGatewayProxyStructuredResultV2,
  APIGatewayProxyEventV2,
  Handler,
} from "aws-lambda";
import mongoose from "mongoose";
import { io } from "socket.io-client";
import config from "../utils/config";
import { jsonResponse } from "../utils/response";

export const handler: Handler = async (
  _event: APIGatewayProxyEventV2,
  _context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
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

  return jsonResponse(200, {
    message: "Health Check Completed",
    services: healthStatus,
  });
};
