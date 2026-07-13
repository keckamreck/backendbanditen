import {
  pgTable,
  foreignKey,
  uuid,
  text,
  boolean,
  timestamp,
  unique,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const priority = pgEnum("priority", ["0", "1", "2"]);

export const list = pgTable(
  "list",
  {
    id: uuid().primaryKey().notNull(),
    title: text().notNull(),
    isFavorite: boolean().notNull(),
    userId: uuid().notNull(),
    categoryId: uuid(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "fkey_userId",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.categoryId],
      foreignColumns: [category.id],
      name: "fkey_categoryId",
    }),
  ],
);

export const task = pgTable(
  "task",
  {
    id: uuid().primaryKey().notNull(),
    title: text().notNull(),
    note: text(),
    deadline: timestamp({ withTimezone: true, mode: "string" }),
    priority: priority().notNull(),
    listId: uuid().notNull(),
    userId: uuid().notNull(),
    done: boolean().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.listId],
      foreignColumns: [list.id],
      name: "fkey_listId",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "fkey_userId",
    }).onDelete("cascade"),
  ],
);

export const user = pgTable(
  "user",
  {
    id: uuid().primaryKey().notNull(),
    username: text().notNull(),
    password: text().notNull(),
    email: text().notNull(),
  },
  (table) => [
    unique("user_username_key").on(table.username),
    unique("user_email_key").on(table.email),
  ],
);

export const category = pgTable(
  "category",
  {
    id: uuid().primaryKey().notNull(),
    name: text().notNull(),
    userId: uuid().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "fkey_userId",
    }).onDelete("cascade"),
  ],
);
