import { Drink } from '../models/drink.model.js'

export const login = async (req, res) => {
    try {
        res.json({
            success: true,
            message: 'Logged in successfully!'
        });
    } catch(err) {
        console.error('Error loggin in', err);
    }
};

export const signup = async (req, res) => {
    try {
        res.json({
            success: true,
            message: 'Signed up in successfully!'
        });
    } catch(err) {
        console.error('Error signing up', err);
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
        const drink = new Drink(name, ingredients, creator, image);

        res.json({
            success: true,
            message: 'Drink created successfully!'
        });
    } catch(err) {
        console.error('Error creating drink', err);
    }
};
