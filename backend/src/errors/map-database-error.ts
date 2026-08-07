import {
  DatabaseError,
  AppError,
  UnprocessableEntityError,
  ConflictError,
} from "./errors.js";

type dbError = {
  cause: {
    code: string;
  };
};

export function mapDatabaseError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  } else {
    const dbError: dbError = error as dbError;
    switch (dbError?.cause?.code) {
      case "23505":
        return new ConflictError("resource already exists");
      case "23503":
        return new UnprocessableEntityError("invalid reference");
      default:
        return new DatabaseError("unknown database error");
    }
  }
}
