import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { drinkType } from "../lib/types";

const Drink = ({ drink }: { drink: drinkType | any }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/drinks/${drink.idDrink}`)}
      className="group relative flex flex-col overflow-hidden bg-stone-900/60 hover:bg-stone-900/90 border border-stone-800 hover:border-amber-500/40 rounded-2xl p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/80 cursor-pointer backdrop-blur-md"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl mb-3 bg-stone-950">
        <img
          src={drink.strDrinkThumb}
          alt={drink.strDrink}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.92] group-hover:brightness-100"
        />
        <div className="absolute inset-0 bg-linear-to-t from-stone-950/90 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

        {/* Floating Action Indicator */}
        <div className="absolute top-2.5 right-2.5 p-2 rounded-lg bg-stone-950/80 border border-amber-500/30 text-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 backdrop-blur-md">
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Title */}
      <div className="flex items-center justify-between px-1 pb-1">
        <h3 className="font-semibold text-sm text-stone-200 group-hover:text-amber-400 transition-colors truncate tracking-wide">
          {drink.strDrink}
        </h3>
      </div>
    </div>
  );
};

export default Drink;