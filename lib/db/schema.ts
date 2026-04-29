import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const subscribers = sqliteTable("subscribers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  subscribedAt: text("subscribed_at").notNull(),
  unsubscribeToken: text("unsubscribe_token").notNull().unique(),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
});

export type Subscriber = typeof subscribers.$inferSelect;
export type NewSubscriber = typeof subscribers.$inferInsert;
