import { relations } from "drizzle-orm/relations";
//@ts-ignore
import { user, list, category, task } from "./schema";

export const listRelations = relations(list, ({ one, many }) => ({
  user: one(user, {
    fields: [list.userId],
    references: [user.id],
  }),
  category: one(category, {
    fields: [list.categoryId],
    references: [category.id],
  }),
  tasks: many(task),
}));

export const userRelations = relations(user, ({ many }) => ({
  lists: many(list),
  tasks: many(task),
  categories: many(category),
}));

export const categoryRelations = relations(category, ({ one, many }) => ({
  lists: many(list),
  user: one(user, {
    fields: [category.userId],
    references: [user.id],
  }),
}));

export const taskRelations = relations(task, ({ one }) => ({
  list: one(list, {
    fields: [task.listId],
    references: [list.id],
  }),
  user: one(user, {
    fields: [task.userId],
    references: [user.id],
  }),
}));
