import SearchBar from './SearchBar';

const Search = ({ className = '', mode = 'drinks', data, setData, originalData }) => {

  return (
    <div className={`w-full max-w-xs ${className}`}>
      <SearchBar mode={mode} data={data} setData={setData} originalData={originalData} />
    </div>
  );
};

export default Search;

