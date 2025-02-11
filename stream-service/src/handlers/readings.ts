import type {
  Context,
  APIGatewayProxyStructuredResultV2,
  APIGatewayProxyEventV2,
  Handler,
} from "aws-lambda";
import axios from "axios";
import {
  getLatestReadings,
  updateReading,
} from "../database/repositories/readings";
import { withDB } from "../middlewares/withDB";
import { jsonResponse } from "../utils/response";
import config from "../utils/config";

export const fetchLatestReadings: Handler = withDB(
  async (
    _event: APIGatewayProxyEventV2,
    _context: Context
  ): Promise<APIGatewayProxyStructuredResultV2> => {
    try {
      const { queryStringParameters } = _event;
      const top = queryStringParameters?.top
        ? parseInt(queryStringParameters.top)
        : 5;
        
      const data = await getLatestReadings(top);

      return jsonResponse(200, data);
    } catch (error) {
      return jsonResponse(500, { success: false, message: error });
    }
  }
);

export const updateProcessedReading: Handler = withDB(
  async (
    _event: APIGatewayProxyEventV2,
    _context: Context
  ): Promise<APIGatewayProxyStructuredResultV2> => {
    try {
      const body = JSON.parse(_event.body || "{}");
      const { id, status, processedAt } = body;

      if (!id || !status || !processedAt) {
        const message = "Missing required fields (id, status, processedAt)";
        throw new Error(message);
      }

      const updatedData = await updateReading({
        id,
        status,
        processedAt,
      });

      await axios.post(`${config.WS_BASE_URI}/notify`, updatedData);

      return jsonResponse(200, { success: true });
    } catch (error) {
      return jsonResponse(500, { success: false, message: error });
    }
  }
);
