import { relations } from "drizzle-orm/relations";
import { user, list, category, task, session, account } from "./schema.js";

export const listRelations = relations(list, ({one, many}) => ({
	user: one(user, {
		fields: [list.userId],
		references: [user.id]
	}),
	category: one(category, {
		fields: [list.categoryId],
		references: [category.id]
	}),
	tasks: many(task),
}));

export const userRelations = relations(user, ({many}) => ({
	lists: many(list),
	tasks: many(task),
	categories: many(category),
	sessions: many(session),
	accounts: many(account),
}));

export const categoryRelations = relations(category, ({one, many}) => ({
	lists: many(list),
	user: one(user, {
		fields: [category.userId],
		references: [user.id]
	}),
}));

export const taskRelations = relations(task, ({one}) => ({
	list: one(list, {
		fields: [task.listId],
		references: [list.id]
	}),
	user: one(user, {
		fields: [task.userId],
		references: [user.id]
	}),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));
