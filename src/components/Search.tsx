import { drinkType, ingredientType } from "../lib/types";
import SearchBar from "./SearchBar";

type searchProps = {
  className?: string;
  mode?: "drinks" | "ingredients";
  data: ingredientType[] | drinkType[] | null;
  setData: (data: any) => void;
  originalData?: any;
};

const Search = ({
  className = "",
  mode = "drinks",
  data,
  setData,
  originalData,
}: searchProps) => {
  return (
    <div className={`w-full max-w-xs ${className}`}>
      <SearchBar
        mode={mode}
        data={data}
        setData={setData}
        originalData={originalData}
      />
    </div>
  );
};

export default Search;