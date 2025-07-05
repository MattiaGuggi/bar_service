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
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail');
        const drinks = await response.json();

        res.json({
            success: true,
            drinks: drinks
        });
    } catch(err) {
        console.error('Error searching up', err);
    }
};

export const getDrink = async (req, res) => {
    const { drink } = req.query;

    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink.toLowerCase().replace(' ', '_')}`);
        const data = await response.json();

        res.json({
            success: true,
            drink: data
        });
    } catch(err) {
        console.error('Error searching up', err);
    }
};

export const getAllIngredients = async (req, res) => {
    try {
        const ingredients = [];

        res.json({
            success: true,
            ingredients: ingredients
        });
    } catch(err) {
        console.error('Error getting all ingredients', err);
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
