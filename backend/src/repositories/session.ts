import { db } from "./db.js";
import { session } from "../db/schema.js";
import { eq, InferSelectModel } from "drizzle-orm";
import { NotFoundError, ValidationError } from "../errors/errors.js";
import { mapDatabaseError } from "../errors/map-database-error.js";
import { Request } from "express";

export type Session = InferSelectModel<typeof session>;

export async function validateSession(request: Request) {
  try {
    const userId = request.params.userId as string;
    const token = request.header("Authorization") as string;
    const session = await getSessionByToken(token);

    if (session[0].userId != userId) {
      throw new ValidationError("User doesn't match");
    }
  } catch (error: unknown) {
    throw mapDatabaseError(error);
  }
}

export async function getSessionByToken(token: string) {
  try {
    const result = await db.select().from(session).where(eq(session.token, token));
    if (!result) {
      throw new NotFoundError("Session not valid");
    }
    return result;
  } catch (error: unknown) {
    throw mapDatabaseError(error);
  }
}