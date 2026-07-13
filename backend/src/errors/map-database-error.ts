import {
  DatabaseError,
  AppError,
  UnprocessableEntityError,
  ConflictError,
} from "./errors.js";

export function mapDatabaseError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  } else if (
    typeof error === "object" &&
    error &&
    "cause" in error &&
    error.cause &&
    typeof error.cause === "object" &&
    "code" in error.cause &&
    (error.cause.code === "23503" || error.cause.code === "23505")
  ) {
    if ("detail" in error.cause && error.cause.detail) {
      if (error.cause.code === "23505") {
        return new ConflictError(error.cause.detail.toString());
      } else {
        return new UnprocessableEntityError(error.cause.detail.toString());
      }
    } else {
      if (error.cause.code === "23505") {
        return new ConflictError("resource already exists");
      } else {
        return new UnprocessableEntityError("invalid reference");
      }
    }
  } else {
    return new DatabaseError("unknown database error");
  }
}
