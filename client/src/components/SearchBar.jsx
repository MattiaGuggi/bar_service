/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios'

const SearchBar = ({ setResult, mode }) => {
    const [input, setInput] = useState('');
    const [drinks, setDrinks] = useState([]); // This repressents drinks or ingredients
    const API_URL = import.meta.env.MODE === "development" ? "http://localhost:8080" : "";

    const fetchDrinks = async () => {
        try {
            const response = await axios.get(`${API_URL}/get-all-drinks`);
            setDrinks(response.data.drinks.drinks);
        } catch (error) {
            console.error('Error fetching drinks:', error);
        }
    };

    const fetchIngredients = async () => {
        try {
            const response = await axios.get(`${API_URL}/get-all-ingredients`);
            setDrinks(response.data.ingredients.drinks);
        } catch (error) {
            console.error('Error fetching drinks:', error);
        }
    };

    useEffect(() => { 
        switch(mode) {
            case 'drinks':
                fetchDrinks();
                break;
            case 'ingredients':
                fetchIngredients();
                break;
            default:
                break;
        }       
    }, []);

    const drinkData = (value) => {
        let result = [];

        drinks.forEach(drink => {
            if (drink?.strDrink?.toLowerCase().startsWith(value.toLowerCase()))
                result.push(drink.strDrink);
            else if (drink?.strIngredient1?.toLowerCase().startsWith(value.toLowerCase()))
                result.push(drink.strIngredient1)
        });
        setResult(result.slice(0, 6));
    };

    const handleChange = (value) => {
        setInput(value);
        if (value === '') {
            setResult([]);
            return;
        }
        drinkData(value);
    }

    return (
        <div className='bg-[#2f3134] rounded-lg h-auto w-auto shadow-custom flex items-center xs:h-14'>
            <div className={`input relative w-full flex`}>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none scale-110">
                    <Search className="size-5 text-blue-700" />
                </div>
                <input
                    type={'text'}
                    placeholder={`${mode == 'drinks' ? 'Search for drinks' : 'Search for ingredients'}`}
                    required
                    onChange={(e) => handleChange(e.target.value)}
                    className={`bg-transparent border-none outline-none text-xl placeholder:text-gray-300 text-white font-medium
                     w-full h-full pl-12 pr-12 py-4 bg-opacity-50 rounded-lg border border-blue-700 focus:border-blue-700 focus:ring-2 focus:ring-blue-700
                    placeholder-gray-400 transition duration-200 xs:py-3`}
                />
		    </div>
        </div>
    )
}

export default SearchBar;
