import mongoose from "mongoose";
import { User } from '../models/user.model.js';
import { Drink } from '../models/drink.model.js';

/**
 * Connects to MongoDB
 */
export const connectDB = async () => {
    try {
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
    return await User.find({});
}
/**
 * Creates user in DB
 *
 * @param {newUser} newUser - User to create in DB
*/
export const createUser = async (newUser) => {
    const user = new User(newUser);
    await user.save();
};
/**
 * Finds user in DB based on surname
 *
 * @param {criteria} criteria - The criteria(surname)
 * @returns {User} User - A user saved in the DB
 */
export const findUser = async (criteria) => {
    return await User.findOne(criteria); // Ensure you're passing the correct criteria
};
/**
 * Updates an existing user
 *
 * @param {user} user - the user you need to update
 * @returns {void}
 */
export const updateUser = async (user) => {
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
export const createDrinkInDb = async (newDrink) => {
    const drink = new Drink(newDrink);
    await drink.save();
};

export const updateUserInDb = async (user) => {
    await User.findByIdAndUpdate(user._id, { $set: user }, { new: true }); // Update the user and return the updated document
};
