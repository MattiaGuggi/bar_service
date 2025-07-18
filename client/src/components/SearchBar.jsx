import { Search as SearchIcon } from 'lucide-react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const SearchBar = ({ setResult, mode, data }) => {
  const [input, setInput] = useState('');

  const handleChange = (value) => {
    setInput(value);
    if (!value) return setResult([]);
    const result = data.filter((item) =>
      (item.strDrink || item.strIngredient1)?.toLowerCase().startsWith(value.toLowerCase())
    ).map((item) => item.strDrink || item.strIngredient1);
    setResult(result.slice(0, 6));
  };

  return (
    <div className="flex items-center bg-white/10 border border-white/30 rounded-full px-4 py-2 backdrop-blur-md">
      <SearchIcon className="text-blue-400 mr-3" />
      <input
        type="text"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={`Search ${mode}`}
        className="bg-transparent text-white placeholder-white/60 w-full outline-none"
      />
    </div>
  );
};

export default SearchBar;
