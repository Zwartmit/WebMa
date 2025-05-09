import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const greetings = pgTable("greetings", {
  id: serial("id").primaryKey(),
  motherName: text("mother_name").notNull(),
  message: text("message").notNull(),
  cardStyle: text("card_style").notNull(),
  hasMusic: boolean("has_music").default(false),
  createdAt: text("created_at").notNull(), // Store date as ISO string
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertGreetingSchema = createInsertSchema(greetings).pick({
  motherName: true,
  message: true,
  cardStyle: true,
  hasMusic: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertGreeting = z.infer<typeof insertGreetingSchema>;
export type Greeting = typeof greetings.$inferSelect;
