import { pgTable, uuid, varchar, text, jsonb, timestamp } from "drizzle-orm/pg-core";

// Image payload structure
export interface ImageBufferPayload {
  data: string; // Base64 or Buffer string representation
  contentType: string;
}

// Users Table
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: varchar("username", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  pfp: jsonb("pfp").$type<ImageBufferPayload>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
});

// Drinks Table
export const drinks = pgTable("drinks", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  ingredients: jsonb("ingredients").$type<string[]>().default([]).notNull(),
  creator: varchar("creator", { length: 255 }).notNull(),
  image: jsonb("image").$type<ImageBufferPayload>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
});

// Inferred TypeScript Types
export type UserSelect = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;
export type DrinkSelect = typeof drinks.$inferSelect;
export type DrinkInsert = typeof drinks.$inferInsert;
