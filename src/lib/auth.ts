import mongoose from "mongoose";
import { User, Drink } from './models';
import { userType } from "./types";
import dotenv from 'dotenv';

dotenv.config();

/**
 * Connects to MongoDB
 */
export const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('Please add MONGODB_URI to your environment variables.');
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit the process with failure (0 successfull, 1 failure)
    }
};
/**
 * Helper function to get every user from MongoDB
 * @returns {User} User - Every user in the DB
 */
export const getUsersFromDB = async () => {
    await connectDB();
    return await User.find({});
}
/**
 * Creates user in DB
 *
 * @param {newUser} newUser - User to create in DB
*/
export const createUser = async (newUser: userType) => {
    await connectDB();
    const user = new User(newUser);
    await user.save();
};
/**
 * Finds user in DB based on email
 *
 * @param {criteria} criteria - The criteria(email)
 * @returns {User} User - A user saved in the DB
 */
export const findUser = async (email: string) => {
    await connectDB();
    return await User.findOne({ email }); // Ensure you're passing the correct criteria
};
/**
 * Updates an existing user
 *
 * @param {user} user - the user you need to update
 * @returns {void}
 */
export const updateUser = async (user: userType) => {
    await connectDB();
    try  {
        await User.findByIdAndUpdate(user._id, { $set: user }, { new: true }); // Update the user and return the updated document
    } catch (err) {
        console.error('Error updating points', err);
    }
};
/**
 * Creates drink in DB
 *
 * @param {newDrink} newDrink - Drink to create in DB
*/
export const createDrinkInDb = async (newDrink: any) => {
    await connectDB();
    const drink = new Drink(newDrink);
    await drink.save();
};

export const updateUserInDb = async (user: userType) => {
    await connectDB();
    await User.findByIdAndUpdate(user._id, { $set: user }, { new: true }); // Update the user and return the updated document
};
