import { db } from "./db.js";

export async function getListById(Listid: string, userId: string) {
  const result = await db.query.list.findFirst({
    where: (list, { eq, and }) =>
      and(eq(list.id, Listid), eq(list.userId, userId)),
  });
  return result;
}
