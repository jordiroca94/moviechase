import { useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";

type Props = {
  mobile?: boolean;
  query: string;
  setOpen: (e: boolean) => void;
  setQuery: (e: string) => void;
};

const SearchBar = ({ mobile, query, setOpen, setQuery }: Props) => {
  const searchModalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchModalRef.current &&
      !searchModalRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className={`relative ${!mobile && "md:block hidden"} `}>
      <input
        type="text"
        autoFocus={mobile ? true : false}
        onFocus={() => query.length && setOpen(true)}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie, tv show, person..."
        className={`bg-white border border-gray-300 rounded-lg px-4 py-1.5 focus:outline-none focus:ring-1 focus:ring-secondary text-black pr-10 ${
          mobile ? "min-w-[300px]" : "min-w-[400px]"
        } `}
      />
      <CiSearch className="absolute text-black top-2 right-2 size-6" />
    </div>
  );
};

export default SearchBar;
