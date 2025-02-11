import {
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2,
  Handler,
  Context,
} from "aws-lambda";
import connectDB from "../database/connector";
import config from "../utils/config";
import { jsonResponse } from "../utils/response";

type AsyncHandler = (
  event: APIGatewayProxyEventV2,
  context: Context
) => Promise<APIGatewayProxyStructuredResultV2>;

export const withDB =
  (handler: AsyncHandler): Handler =>
  async (
    event: APIGatewayProxyEventV2,
    context: Context
  ): Promise<APIGatewayProxyStructuredResultV2> => {
    try {
      await connectDB(config.DB_URI);
      return await handler(event, context);
    } catch (error) {
      return jsonResponse(500, { success: false});
    }
  };
