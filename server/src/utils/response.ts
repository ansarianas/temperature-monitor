import { HttpCodes } from "../constants/http";
import { APIError } from "./API";

export function failureHandler(error: any) {
  const { code, message } = HttpCodes.INTERNAL_SERVER_ERROR;
  if (error instanceof APIError) {
    const { statusCode, detail, stack, message } = error;
    return {
      statusCode,
      hasError: true,
      detail,
      ...(stack && { stack }),
      ...(message && { message }),
    };
  }

  return {
    statusCode: code,
    hasError: true,
    detail: message,
  };
}

export function successHandler(
  message?: string,
  code: number = HttpCodes.OK.code,
  data?: any
) {
  return {
    statusCode: code,
    hasError: false,
    ...(message && { message }),
    ...(data && { data }),
  };
}
