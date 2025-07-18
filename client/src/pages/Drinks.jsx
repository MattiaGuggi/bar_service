import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Drink from '../components/Drink'
import Search from '../components/Search'
import { useUser } from '../components/UserContext';
import Loader from '../components/Loader';

const Drinks = () => {
  const [ingredients, setIngredients] = useState([]);
  const [drinks, setDrinks] = useState(null);
  const [allDrinks, setAllDrinks] = useState(null);
  const [drink, setDrink] = useState({ name: '', image: '', ingredients: [] });
  const [selectedIngredient, setSelectedIngredient] = useState('');

  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useUser();
  const API_URL = import.meta.env.MODE === "development" ? "http://localhost:8080" : "";

  const fetchDrinks = async () => {
    try {
      const response = await axios.get(`${API_URL}/get-all-drinks`, {
        credentials: "include"
      });
      setDrinks(response.data.drinks);
      setAllDrinks(response.data.drinks);
      console.log(response.data.drinks);
    } catch (err) {
      console.error('Error fetching drinks', err);
    }
  };

  const fetchIngredients = async () => {
    try {
      const response = await axios.get(`${API_URL}/get-all-ingredients`, {
        credentials: "include"
      });
      setIngredients(response.data.ingredients);
      console.log(response.data.ingredients);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  const createDrink = async () => {
    const response = await axios.post(`${API_URL}/create-drink`, {
      name: drink.name,
      ingredients: drink.ingredients,
      creator: user._id,
      image: drink.image
    });
    setMessage(response.data.message);
    fetchDrinks();
  };

  const handleCreateDrink = (e) => {
    setIsOpen(!isOpen);
    const text = e.target.innerText;
    if (text === 'Confirm') {
      createDrink();
      setDrink({ name: '', image: '', ingredient: [] });
      setIsOpen(false);
    }
    if (text === 'Exit') {
      setIsOpen(false);
      setDrink({ name: '', image: '', ingredient: [] });
    }
  };

  const addIngredient = (e) => {
    e.preventDefault();
    const ingredientToAdd = ingredients.find(ing => ing.strIngredient1 === selectedIngredient);
    if (ingredientToAdd && !drink.ingredients.some(ing => ing.strIngredient1 === selectedIngredient)) {
      const imageUrl = `https://www.thecocktaildb.com/images/ingredients/${selectedIngredient.toLowerCase().replace(' ', '_')}-Small.png`;
      setDrink(prev => ({ ...prev, ingredients: [...prev.ingredients, { ...ingredientToAdd, image: imageUrl }] }));
      setSelectedIngredient('');
    }
  };

  const loadPage = async () => {
    await fetchDrinks();
    await fetchIngredients();
    setIsMounted(true)
  };

  useEffect(() => {
    loadPage();
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchIngredients();
      setDrink(prev => ({ ...prev, ingredients: [] }));
    }
  }, [isOpen]);

  if (!isMounted) return <Loader />

  return (
    <div className="flex flex-col items-center justify-center mt-20">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-10">
            {drinks && (<Search mode="drinks" data={drinks} setData={setDrinks} originalData={allDrinks} />)}
            {ingredients && (<Search mode="ingredients" data={ingredients} setData={setIngredients} />)}
            <button
                className="rounded-full px-6 py-2 bg-white/10 text-white border border-white/30 backdrop-blur-md hover:bg-white/20 transition-all"
                onClick={handleCreateDrink}
            >
            Create a drink
            </button>
        </div>

        {isOpen && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-8 shadow-2xl w-[90%] max-w-xl text-white">
                    <h3 className="text-2xl font-bold mb-6">Create your drink</h3>
                    <form onSubmit={addIngredient} className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Drink name"
                            value={drink.name}
                            onChange={(e) => setDrink(prev => ({ ...prev, name: e.target.value }))}
                            className="bg-white/10 px-4 py-3 rounded-lg text-white placeholder-white/60 focus:outline-none"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            className="text-white"
                            onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => setDrink(prev => ({ ...prev, image: reader.result }));
                                reader.readAsDataURL(file);
                            }
                            }}
                        />
                        {drink.image && (
                            <img src={drink.image} alt={drink.name} className="h-20 w-20 object-cover rounded-lg" />
                        )}
                        <select
                            value={selectedIngredient}
                            onChange={(e) => setSelectedIngredient(e.target.value)}
                            className="bg-white/10 px-4 py-3 rounded-lg text-white"
                        >
                            <option value="">Choose the ingredients</option>
                            {ingredients.map((ing, idx) => (
                            <option key={idx} value={ing.strIngredient1} className='text-black'>
                                {ing.strIngredient1}
                            </option>
                            ))}
                        </select>
                        <button type="submit" className="bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20">
                            Add Ingredient
                        </button>
                    </form>

                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {drink.ingredients.map((ing, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <img src={ing.image} alt={ing.strIngredient1} className="h-12 w-12 rounded-full" />
                          <p className="text-sm mt-2">{ing.strIngredient1}</p>
                        </div>
                    ))}
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <button onClick={handleCreateDrink} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg">
                            Confirm
                        </button>
                        <button onClick={handleCreateDrink} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg">
                            Exit
                        </button>
                    </div>
                </div>
            </div>
        )}

        {message && (
            <p className="bg-green-500 px-6 py-3 rounded-xl mt-6 text-white shadow-lg">{message}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 my-16">
            {Array.isArray(drinks) && drinks.map((drink, idx) => <Drink key={idx} drink={drink} />)}
        </div>
    </div>
  );
};

export default Drinks;
