import { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

const Search = ({ className = '', mode = 'drinks', data }) => {
  const [result, setResult] = useState([]);

  return (
    <div className={`w-full max-w-xs ${className}`}>
      <SearchBar setResult={setResult} mode={mode} data={data} />
      <SearchResults results={result} mode={mode} />
    </div>
  );
};

export default Search;

