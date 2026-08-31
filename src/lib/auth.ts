import { db, connectDB } from "./db";
import { users, drinks, UserSelect, UserInsert, DrinkInsert } from "./schema";
import { eq } from "drizzle-orm";

/**
 * Helper function to get every user from PostgreSQL
 * @returns {Promise<UserSelect[]>} List of all users
 */
export const getUsersFromDB = async () => {
  await connectDB();
  return await db.select().from(users);
};

/**
 * Creates user in DB
 *
 * @param {UserInsert} newUser - User data to insert
 */
export const createUser = async (newUser: UserInsert) => {
  await connectDB();
  const [createdUser] = await db.insert(users).values(newUser).returning();
  return createdUser;
};

/**
 * Finds user in DB based on email
 *
 * @param {string} email - Email address to search
 * @returns {Promise<UserSelect | null>} User object or null
 */
export const findUser = async (email: string) => {
  await connectDB();
  const result = await db.select().from(users).where(eq(users.email, email));
  return result[0] || null;
};

/**
 * Updates an existing user
 *
 * @param {Partial<UserSelect> & { id: string }} user - The user record to update (must include id)
 */
export const updateUser = async (user: Partial<UserSelect> & { id: string }) => {
  await connectDB();
  try {
    const { id, ...updateData } = user;
    const [updated] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning();
    return updated;
  } catch (err) {
    console.error("Error updating user", err);
  }
};

/**
 * Creates drink in DB
 *
 * @param {DrinkInsert} newDrink - Drink data to insert
 */
export const createDrinkInDb = async (newDrink: DrinkInsert) => {
  await connectDB();
  const [createdDrink] = await db.insert(drinks).values(newDrink).returning();
  return createdDrink;
};

/**
 * Updates an existing user record in DB
 *
 * @param {Partial<UserSelect> & { id: string }} user - The user object containing an id
 */
export const updateUserInDb = async (user: Partial<UserSelect> & { id: string }) => {
  await connectDB();
  const { id, ...updateData } = user;
  const [updated] = await db
    .update(users)
    .set(updateData)
    .where(eq(users.id, id))
    .returning();
  return updated;
};
