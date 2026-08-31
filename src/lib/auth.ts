import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "./schema";
import { users, drinks } from "./schema";

const dbUrl = process.env.DATABASE_URL || process.env.MONGODB_URI || "";
const sql = neon(dbUrl);
export const db = drizzle(sql, { schema });

/**
 * Normalizes input to extract string IDs whether passed as a string or an object
 */
const getId = (val: any): string => {
  if (!val) return "";
  if (typeof val === "string") return val;
  return val._id || val.id || "";
};

/**
 * Connects / verifies connection setup
 */
export const connectDB = async () => {
  if (!dbUrl) {
    throw new Error("Please add DATABASE_URL or MONGODB_URI to your environment variables.");
  }
  return db;
};

/**
 * Helper function to get every user from DB
 * @returns {Promise<any[]>} User - Every user in the DB
 */
export const getUsersFromDB = async () => {
  await connectDB();
  return await db.select().from(users);
};

/**
 * Creates user in DB
 *
 * @param {any} newUser - User to create in DB
 */
export const createUser = async (newUser: any) => {
  await connectDB();
  const payload: any = {
    username: newUser.username,
    email: newUser.email,
    password: newUser.password,
    pfp: newUser.pfp || null,
  };
  if (newUser._id) payload._id = newUser._id;

  const [created] = await db.insert(users).values(payload).returning();
  return created;
};

/**
 * Finds user in DB based on email
 *
 * @param {string} email - The email criteria
 * @returns {Promise<any | null>} User - A user saved in the DB
 */
export const findUser = async (email: string) => {
  await connectDB();
  const result = await db.select().from(users).where(eq(users.email, email));
  return result[0] || null;
};

/**
 * Updates an existing user
 *
 * @param {any} user - the user you need to update
 * @returns {Promise<any>}
 */
export const updateUser = async (user: any) => {
  await connectDB();
  try {
    const userId = getId(user);
    const [updated] = await db
      .update(users)
      .set(user)
      .where(eq(users._id, userId))
      .returning();
    return updated;
  } catch (err) {
    console.error("Error updating points", err);
  }
};

/**
 * Creates drink in DB
 *
 * @param {any} newDrink - Drink to create in DB
 */
export const createDrinkInDb = async (newDrink: any) => {
  await connectDB();
  const payload: any = {
    name: newDrink.name,
    ingredients: newDrink.ingredients || [],
    creator: typeof newDrink.creator === "object" ? getId(newDrink.creator) : newDrink.creator,
    image: newDrink.image || null,
  };
  if (newDrink._id) payload._id = newDrink._id;

  const [created] = await db.insert(drinks).values(payload).returning();
  return created;
};

export const updateUserInDb = async (user: any) => {
  await connectDB();
  const userId = getId(user);
  const [updated] = await db
    .update(users)
    .set(user)
    .where(eq(users._id, userId))
    .returning();
  return updated;
};