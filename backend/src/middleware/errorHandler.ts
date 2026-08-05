import { AppError } from "../errors/errors.js";
import { Request, Response, NextFunction } from "express";

export function errorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction,
): void {
  if (error instanceof AppError) {
    response
      .status(error.statusCode)
      .send({ error: { code: error.code, message: error.message } });
  } else {
    console.error(error);
    response.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An internal server error occurred",
      },
    });
  }
}
