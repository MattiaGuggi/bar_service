/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useState } from 'react';

const SearchResults = ({ results, mode }) => {
    const [research, setResearch] = useState({});
    const API_URL = import.meta.env.MODE === "development" ? "http://localhost:8080" : "";

    const fetchDrink = async (value) => {
        try {
            const response = await axios.get(`${API_URL}/get-drink`, { params: { drink: value } });

            setResearch(response.data.drink.drinks[0]);
            console.log(response.data.drink.drinks[0]);
        } catch(err) {
            console.error('Error fetching drinks', err);
        }
    };

    const fetchIngredients = async (value) => {
        try {
            const response = await axios.get(`${API_URL}/get-ingredient`, { params: { ingredient: value } });

            setResearch(response.data.ingredient.drinks[0]);
            console.log(response.data.ingredient.drinks[0]);
        } catch(err) {
            console.error('Error fetching ingredient', err);
        }
    };

    const handleResultClick = (value) => {
        if(mode == 'drinks') fetchDrink(value);
        if(mode == 'ingredients') fetchIngredients(value);
    };

    return (
        <>
            <style>{`
                .result::-webkit-scrollbar {
                    width: 0px;
                }
                
                .result::-webkit-scrollbar-thumb {
                    background-color: rgb(203 213 225 / 1);
                    border-radius: 5px;
                }
                
                .result::-webkit-scrollbar-track {
                    background-color: transparent;
                }
            `}</style>
            <div className='result w-full bg-[#2f3134] flex flex-col shadow-lg rounded-lg mt-4 max-h[300px] overflow-y-scroll
            scrollbar-thumb-slate-400 scrollbar-trace-slate-600 xs:mt-2'>
                {results.map((result, idx) => {
                    return (
                        <div key={idx}>
                            <p className='w-full text-white text-lg cursor-pointer py-3 hover:bg-white hover:backdrop-filter hover:backdrop-blur-md hover:bg-opacity-10'
                                onClick={() => handleResultClick(result)}
                            >
                                {result}
                            </p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default SearchResults;
