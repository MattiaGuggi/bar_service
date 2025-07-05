import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Drink from '../components/Drink'
import Search from '../components/Search'

const Drinks = () => {
    const [drinks, setDrinks] = useState(null);
    const [message, setMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [confirmation, setConfirmation] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [newIngredients, setNewIngredients] = useState([]);
    const API_URL = import.meta.env.MODE === "development" ? "http://localhost:8080" : "";

    const fetchDrinks = async () => {
        try {
            const response = await axios.get(`${API_URL}/get-all-drinks`);

            setDrinks(response.data.drinks.drinks);
            console.log(response.data.drinks.drinks);
        } catch(err) {
            console.error('Error fetching all drinks', err);
        }
    };

    const fetchIngredients = async () => {
        try {
            const response = await axios.get(`${API_URL}/get-all-ingredients`);
            setIngredients(response.data.ingredients);
        } catch (error) {
            console.error('Error fetching drinks:', error);
        }
    };

    const createDrink = async () => {
        const response = await axios.post(`${API_URL}/create-drink`, { name, ingredients, creator, image });
        const data = response.data;
        setMessage(data.message);
        fetchDrinks();
    };

    const handleCreateDrink = async (e) => {
        setIsOpen((prev) => !prev);

        switch(e.target.innerText) {
            case 'Confirm':
                createDrink();
                break;
            case 'Exit':
                setConfirmation(false);
                break;
            default:
                break;
        }
    };

    const addIngredient = async (ingredient) => {
        setNewIngredients((prev) => prev.push(ingredient));
    };

    useEffect(() => {
        fetchDrinks();
        fetchIngredients();
    }, []);

    return (
        <div className='flex flex-col items-center justify-center mt-12'>
            <div className='flex items-center justify-center w-1/2 gap-10'>
                <Search mode={'drinks'} />
                <Search mode={'ingredients'} />
                <button
                    className='rounded-2xl px-7 py-1 border shadow-custom duration-400 transition-all hover:-translate-y-3'
                    onClick={handleCreateDrink}
                >
                    Create a drink
                </button>
            </div>
            {isOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50'>
                    <div className='shadow-custom rounded-xl py-16 px-9 bg-white'>
                        <h3 className='text-2xl font-bold mb-10'>Create your drink</h3>
                        <form className='px-10 py-5'>
                            <select name="ingredients" id="" className='my-10 rounded-lg px-5 py-3 border shadow-custom'>
                                <option value="">Choose the ingredients</option>
                                {ingredients.length > 0 && (
                                    ingredients.map((ingredient, idx) => (
                                        <option key={idx} value={ingredient.name} className='' onClick={addIngredient}>{ingredient.name}</option>
                                    ))
                                )}
                            </select>
                            <div className='flex items-center justify-center gap-8'>
                                <button className='px-5 py-2 rounded-xl border shadow-custom duration-400 transition-all hover:-translate-y-3' onClick={handleCreateDrink}>Confirm</button>
                                <button className='px-5 py-2 rounded-xl border shadow-custom duration-400 transition-all hover:-translate-y-3' onClick={handleCreateDrink}>Exit</button>
                            </div>
                        </form>
                        <div className='newIngredients flex flex-col items-center justify-center'>
                            {newIngredients.length > 0 && (
                                newIngredients.map((ingredient, idx) => (
                                    <div key={idx} className='flex flex-col text-center'>
                                        <h3 className='text-base font-semibold'>{ingredient.name}</h3>
                                        <img src={ingredient.image} alt={ingredient.name} />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
            {message && (
                <h3 className='bg-green-400 font-semibold text-base px-10 py-4 m-10 rounded-xl shadow-custom'>{message}</h3>
            )}
            <div className='grid grid-cols-3 gap-36 my-16'>
                {Array.isArray(drinks) && drinks.length > 0 && (
                    drinks.map((drink, idx) => (
                        <Drink key={idx} drink={drink} />
                    ))
                )}
            </div>
        </div>
    )
}

export default Drinks
