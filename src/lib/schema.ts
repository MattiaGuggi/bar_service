import { pgTable, uuid, varchar, text, jsonb, timestamp } from "drizzle-orm/pg-core";

export interface BufferImage {
  data: any;
  contentType: string;
}

// Users Table
export const users = pgTable("users", {
  _id: uuid("_id").defaultRandom().primaryKey(),
  username: varchar("username", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  password: text("password").notNull(),
  pfp: jsonb("pfp").$type<BufferImage>(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

// Drinks Table
export const drinks = pgTable("drinks", {
  _id: uuid("_id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  ingredients: jsonb("ingredients").$type<string[]>().default([]),
  creator: text("creator").notNull(),
  image: jsonb("image").$type<BufferImage>(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type UserSelect = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;
export type DrinkSelect = typeof drinks.$inferSelect;
export type DrinkInsert = typeof drinks.$inferInsert;