import {
  pgTable,
  foreignKey,
  uuid,
  text,
  boolean,
  date,
  unique,
  pgEnum,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const priority = pgEnum("priority", ["high", "medium", "low"]);

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
    deadline: date(),
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
    id: uuid("id")
      .default(sql`pg_catalog.gen_random_uuid()`)
      .primaryKey(),
    name: text().notNull(),
    email: text().notNull(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    username: text().notNull(),
    displayUsername: text("display_username"),
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

export const session = pgTable(
  "session",
  {
    id: uuid("id")
      .default(sql`pg_catalog.gen_random_uuid()`)
      .primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: uuid("id")
      .default(sql`pg_catalog.gen_random_uuid()`)
      .primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: uuid("id")
      .default(sql`pg_catalog.gen_random_uuid()`)
      .primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);
