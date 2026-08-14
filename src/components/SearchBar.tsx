'use client'
import { Search as SearchIcon, X } from "lucide-react";
import { useState } from "react";

const SearchBar = ({
  mode,
  data,
  setData,
  originalData,
}: {
  mode: string;
  data: any;
  setData: (data: any) => void;
  originalData: any;
}) => {
  const [input, setInput] = useState("");

  const handleChange = (value: string) => {
    setInput(value);
    if (!value) {
      setData(originalData);
      return;
    }

    const result = originalData.filter((item: any) =>
      (item?.strDrink || item?.strIngredient1)
        ?.toLowerCase()
        .startsWith(value.toLowerCase())
    );

    setData(result.slice(0, 6));
  };

  const clearInput = () => {
    setInput("");
    setData(originalData);
  };

  return (
    <div className="relative flex items-center bg-stone-950/80 border border-stone-800 focus-within:border-amber-500/60 rounded-xl px-3.5 py-2.5 transition-all duration-200 shadow-inner group">
      <SearchIcon className="w-4 h-4 text-stone-500 group-focus-within:text-amber-400 transition-colors shrink-0 mr-2.5" />
      <input
        type="text"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={`Search ${mode}...`}
        className="bg-transparent text-stone-200 placeholder-stone-500 text-xs sm:text-sm w-full focus:outline-none"
      />
      {input && (
        <button
          type="button"
          onClick={clearInput}
          className="p-1 text-stone-500 hover:text-stone-300 rounded-md transition-colors ml-1 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;