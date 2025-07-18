import { createUser, findUser, createDrinkInDb, updateUserInDb } from '../db/database.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await findUser({ email, password });

        if (!user) return res.json({ success: false, message: 'User does not exist' });

        res.json({
            success: true,
            message: 'Logged in successfully!',
            user: user
        });
    } catch(err) {
        console.error('Error loggin in', err);
        res.json({
            success: false,
            message: 'Failed to login'
        });
    }
};

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        await createUser({ username, email, password });

        res.json({
            success: true,
            message: 'Signed up in successfully!'
        });
    } catch(err) {
        console.error('Error signing up', err);
        res.json({
            success: true,
            message: 'Failed to signup'
        });
    }
};

export const getAllDrinks = async (req, res) => {
    try {
        const allDrinks = [];
        const letters = 'abcdefghijklmnopqrstuvwxyz';

        for (const letter of letters) {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);

            if (!response.ok) {
                console.warn(`Request failed for letter ${letter} with status ${response.status}`);
                continue;
            }

            const data = await response.json();

            if (data.drinks) {
                allDrinks.push(...data.drinks);
            }
        }

        res.json({
            success: true,
            drinks: allDrinks
        });
    } catch (err) {
        console.error('Error fetching all drinks', err);
        res.status(500).json({ success: false, message: 'Failed to fetch drinks' });
    }
};

export const getDrink = async (req, res) => {
    const { drink } = req.query;

    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink?.toLowerCase()?.replace(' ', '_')}`);
        const data = await response.json();

        res.json({
            success: true,
            drink: data
        });
    } catch(err) {
        console.error('Error searching up', err);
    }
};

export const getIngredient = async (req, res) => {
    const { ingredient } = req.query;

    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${ingredient.toLowerCase().replace(' ', '_')}`);
        const data = await response.json();

        res.json({
            success: true,
            ingredient: data
        });
    } catch(err) {
        console.error('Error searching up', err);
    }
};

export const getAllIngredients = async (req, res) => {
    try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');

        // Ensure the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        res.json({
            success: true,
            ingredients: data.drinks
        });
    } catch (err) {
        console.error('Error getting all ingredients', err.message);
        res.status(500).json({ success: false, error: 'Failed to fetch ingredients' });
    }
};

export const createDrink = async (req, res) => {
    const { name, ingredients, creator, image } = req.body;

    try {

        await createDrinkInDb({ name, ingredients, creator, image });

        res.json({
            success: true,
            message: 'Drink created successfully!'
        });
    } catch(err) {
        console.error('Error creating drink', err);
    }
};

export const updateUser = async (req, res) => {
    const { user } = req.body;
    try {
        await updateUserInDb(user);

        res.json({
            success: true,
            message: 'Updated user successfully'
        });
    } catch(err) {
        console.error('Error updating user', err);
        res.json({
            success: false,
            message: 'Error updating user'
        });
    }
};

export const getDrinkDetails = async (req, res) => {
    const { id } = req.query;

    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();

        res.json({
            success: true,
            message: 'Drink retrieved successfully',
            drink: data.drinks
        });
    } catch(err) {
        console.error('Error getting drink details', err);
        res.json({
            success: false,
            message: 'Error retrieving drink',
        });
    }
};
