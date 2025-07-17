const Drink = ({ drink }) => {
  return (
    <div className="flex flex-col items-center text-white cursor-pointer transition-transform duration-300 hover:scale-105 bg-white/10 rounded-xl p-4 shadow-lg backdrop-blur-md">
      <h1 className="font-semibold text-lg mb-3">{drink.strDrink}</h1>
      <img src={drink.strDrinkThumb} alt={drink.strDrink} className="rounded-lg w-52 h-52 object-cover" />
    </div>
  );
};

export default Drink;
