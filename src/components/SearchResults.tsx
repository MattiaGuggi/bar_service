import axios from "axios";
import { ChevronRight } from "lucide-react";

const SearchResults = ({
  results,
  mode,
}: {
  results: string[];
  mode: string;
}) => {
  const API_URL =
    import.meta.env.MODE === "development" ? "http://localhost:8080" : "";

  const fetchData = async (value: string) => {
    const url = mode === "drinks" ? "/get-drink" : "/get-ingredient";
    const res = await axios.get(`${API_URL}${url}`, {
      params: { [mode.slice(0, -1)]: value },
    });
    console.log(res.data);
  };

  if (!results || results.length === 0) return null;

  return (
    <div className="mt-2 bg-stone-900/95 border border-amber-500/20 rounded-xl overflow-hidden max-h-60 overflow-y-auto backdrop-blur-xl shadow-2xl divide-y divide-stone-800/60">
      {results.map((item, idx) => (
        <div
          key={idx}
          onClick={() => fetchData(item)}
          className="flex items-center justify-between px-4 py-2.5 cursor-pointer text-stone-300 hover:text-amber-400 hover:bg-amber-500/10 transition-all duration-150 text-xs sm:text-sm font-medium group"
        >
          <span className="truncate">{item}</span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
        </div>
      ))}
    </div>
  );
};

export default SearchResults;