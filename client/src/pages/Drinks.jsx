import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Drink from '../components/Drink'
import Search from '../components/Search'

const Drinks = () => {
    const [drinks, setDrinks] = useState(null);
    const [drinkName, setDrinkName] = useState('');
    const [drinkImg, setDrinkImg] = useState('');
    const [confirmation, setConfirmation] = useState(null);
    const [message, setMessage] = useState('');
    const [selectedIngredient, setSelectedIngredient] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [newIngredients, setNewIngredients] = useState([]);
    const API_URL = import.meta.env.MODE === "development" ? "http://localhost:8080" : "";

    const fetchDrinks = async () => {
        try {
            const response = await axios.get(`${API_URL}/get-all-drinks`);

            setDrinks(response.data.drinks);
        } catch(err) {
            console.error('Error fetching all drinks', err);
        }
    };

    const fetchIngredients = async () => {
        try {
            const response = await axios.get(`${API_URL}/get-all-ingredients`);
            setIngredients(response.data.ingredients.drinks);
        } catch (error) {
            console.error('Error fetching drinks:', error);
        }
    };

    const createDrink = async () => {
        const response = await axios.post(`${API_URL}/create-drink`, { name: drinkName, newIngredients, creator: 'panda', image: drinkImg });
        const data = response.data;
        setMessage(data.message);
        fetchDrinks();
    };

    const handleCreateDrink = async (e) => {
        setIsOpen((prev) => !prev);

        switch(e.target.innerText) {
            case 'Confirm':
                createDrink();
                setDrinkName('');
                break;
            case 'Exit':
                setConfirmation(false);
                setDrinkName('');
                break;
            default:
                break;
        }
    };

    const addIngredient = (e) => {
        e.preventDefault();

        const ingredientToAdd = ingredients.find(ing => ing.strIngredient1 === selectedIngredient);

        if (ingredientToAdd && !newIngredients.some(ing => ing.strIngredient1 === ingredientToAdd.strIngredient1)) {
            const imageUrl = `https://www.thecocktaildb.com/images/ingredients/${ingredientToAdd.strIngredient1.toLowerCase().replace(' ', '_')}-Small.png`;

            const ingredientWithImage = {
                ...ingredientToAdd,
                image: imageUrl
            };

            setNewIngredients(prev => [...prev, ingredientWithImage]);
            setSelectedIngredient('');
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchIngredients();
            setNewIngredients([]);
        }
    }, [isOpen]);

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
                        <div className='px-10 py-5'>
                            <form onSubmit={addIngredient} className='flex flex-col'>
                                <input type="text" placeholder='Drink name' value={drinkName} onChange={(e) => setDrinkName(e.target.value)} className='shadow-custom px-6 py-3 rounded-lg' />
                                <input type="file" accept='image/' className='rounded-xl shadow-custom'
                                    onChange={e => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setDrinkImg(reader.result);
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                                <img src={drinkImg} alt={drinkName} className='shadow-custom rounded-2xl h-20 w-20' />
                                <select
                                    name="ingredients"
                                    className="my-10 rounded-lg px-5 py-3 border shadow-custom"
                                    value={selectedIngredient}
                                    onChange={(e) => setSelectedIngredient(e.target.value)}
                                >
                                    <option value="">Choose the ingredients</option>
                                    {ingredients.map((ingredient, idx) => (
                                        <option key={idx} value={ingredient.strIngredient1}>
                                            {ingredient.strIngredient1}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="submit"
                                    className="ml-5 px-5 py-2 rounded-xl border shadow-custom duration-400 transition-all hover:-translate-y-3"
                                >
                                    Add
                                </button>
                            </form>
                            <div className='flex items-center justify-center gap-8'>
                                <button className='px-5 py-2 rounded-xl border shadow-custom duration-400 transition-all hover:-translate-y-3' onClick={handleCreateDrink}>Confirm</button>
                                <button className='px-5 py-2 rounded-xl border shadow-custom duration-400 transition-all hover:-translate-y-3' onClick={handleCreateDrink}>Exit</button>
                            </div>
                        </div>
                        <div className='newIngredients grid grid-cols-3'>
                            {newIngredients.length > 0 && (
                                newIngredients.map((ingredient, idx) => (
                                    <div key={idx} className='flex flex-col text-center'>
                                        <h3 className='text-base font-semibold'>{ingredient.strIngredient1}</h3>
                                        <img src={ingredient.image} alt={ingredient.strIngredient1} />
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
