import express from 'express'
import { login, signup, getAllDrinks, getAllIngredients, getDrink, getIngredient } from '../controller/authController.js'

const authRoutes = () => {
    const router = express.Router();

    router.get('/get-all-drinks', (req, res) => getAllDrinks(req, res));
    router.get('/get-all-ingredients', (req, res) => getAllIngredients(req, res));
    router.get('/get-drink', (req, res) => getDrink(req, res));
    router.get('/get-ingredient', (req, res) => getIngredient(req, res));

    router.post('/login', (req, res) => login(req, res));
    router.post('/signup', (req, res) => signup(req, res));
    router.post('/create-drink', (req, res) => createDrink(req, res));

    return router;
};

export default authRoutes;
