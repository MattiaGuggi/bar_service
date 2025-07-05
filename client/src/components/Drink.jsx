import React from 'react'

const Drink = ({ drink }) => {
  return (
    <div className='flex flex-col text-start cursor-pointer duration-400 transition-all hover:-translate-y-3 hover:scale-110'>
      <h1 className='font-bold text-lg'>{drink.strDrink}</h1>
      <img src={drink.strDrinkThumb} alt={drink.strDrink} className='rounded-lg w-60' />
    </div>
  )
}

export default Drink
