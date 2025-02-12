import { Request, Response } from "express";
import axios from "axios";
import { HttpCodes, HttpMethods } from "../constants/http";
import config from "../utils/config";
import {
  getLatestReadings,
  updateReading,
} from "../database/repositories/readings";
import { asyncHandler } from "../utils/helper";
import { successHandler } from "../utils/response";
import { BadRequestError } from "../utils/API";

/**
 * @public GET /api/tepmperature/latest-readings?top=5
 */
export const fetchLatestReadings = asyncHandler(
  async (req: Request, res: Response) => {
    const { params } = req;

    const top = params?.top ? parseInt(params.top) : 5;

    const data = await getLatestReadings(top);
    const successMsg = "Latest readings fetched!";
    const response = successHandler(successMsg, HttpCodes.OK.code, data);

    return res.status(res.statusCode).send(response);
  },
  { apiEndpoint: "/api/temperature/latest-readings?top=5", method: HttpMethods.GET }
);

/**
 * @public PATCH /api/tepmperature/reading
 */
export const updateProcessedReading = asyncHandler(
  async (req: Request, res: Response) => {
    const { id, status, processedAt } = req.body;

    if (!id || !status || !processedAt) {
      const message = "Missing required fields (id, status, processedAt)";
      throw new BadRequestError(message);
    }

    const updatedData = await updateReading({
      id,
      status,
      processedAt,
    });

    await axios.post(`${config.WS_BASE_URI}/notify`, updatedData);

    const successMsg = "Update successful!";
    const data = { success: true };
    const response = successHandler(successMsg, HttpCodes.OK.code, data);

    return res.status(res.statusCode).send(response);
  },
  { apiEndpoint: "/api/temperature/processed-reading", method: HttpMethods.PATCH }
);
