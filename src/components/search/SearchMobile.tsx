import { RxCross1 } from "react-icons/rx";
import SearchBar from "./SearchBar";

type Props = {
  mobile?: boolean;
  query: string;
  setOpen: (e: boolean) => void;
  setOpenMobile: (e: boolean) => void;
  setQuery: (e: string) => void;
};

const SearchMobile = ({ query, setOpen, setQuery, setOpenMobile }: Props) => {
  return (
    <div className="absolute z-50 top-0 inset-x-0 py-4 px-4 lg:px-8 bg-primary flex justify-between">
      <SearchBar mobile query={query} setOpen={setOpen} setQuery={setQuery} />
      <button onClick={() => setOpenMobile(false)}>
        <RxCross1 />
      </button>
    </div>
  );
};

export default SearchMobile;
