import axios from "axios";

const SearchResults = ({ results, mode }) => {
  const API_URL = import.meta.env.MODE === "development" ? "http://localhost:8080" : "";

  const fetchData = async (value) => {
    const url = mode === 'drinks' ? '/get-drink' : '/get-ingredient';
    const res = await axios.get(`${API_URL}${url}`, { params: { [mode.slice(0, -1)]: value } });
    console.log(res.data);
  };

  return (
    <div className="mt-2 bg-white/10 rounded-lg overflow-hidden max-h-60 overflow-y-auto backdrop-blur-md border border-white/20">
      {results.map((item, idx) => (
        <p
          key={idx}
          onClick={() => fetchData(item)}
          className="px-4 py-2 cursor-pointer text-white hover:bg-white/20 transition-colors"
        >
          {item}
        </p>
      ))}
    </div>
  );
};

export default SearchResults;
