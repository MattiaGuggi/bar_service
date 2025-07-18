import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import { MoveLeft } from 'lucide-react';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const DrinkPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [drink, setDrink] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    const API_URL = import.meta.env.MODE === "development" ? "http://localhost:8080" : "";

    const fetchDrink = async () => {
        try {
            const response = await axios.get(`${API_URL}/get-drink-details`, { params: { id } });
            const data = response.data;

            setDrink(data.drink[0]);
        } catch(err) {
            console.error('Error getting drink', err);
        }
    };

    const loadPage = async () => {
        await fetchDrink();
        setIsMounted(true);
    };

    const goBack = () => {
        navigate('/drinks');
    };

    useEffect(() => {
        loadPage();
    }, []);

    if (!isMounted) return <Loader />

    return (
        <div className='w-full h-full'>
            <MoveLeft onClick={goBack} className='relative hover:scale-150 duration-400 transition-all scale-125 cursor-pointer' />
            <h1 className='font-bold text-5xl'>Drink {id}: <span className='bg-gradient-to-br from-indigo-200 to-indigo-400 bg-clip-text text-transparent'>{drink?.strDrink}</span></h1>
        </div>
    )
}

export default DrinkPage
