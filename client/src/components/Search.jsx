/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';


const Search = ({ className, mode = 'drinks'}) => {
  const [result, setResult] = useState([]);

  return (
    <div className={`search ${className}`}>
      <SearchBar setResult={setResult} mode={mode} />
      <SearchResults results={result} mode={mode} />
    </div>
  )
}


export default Search;
