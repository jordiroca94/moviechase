import { getSearch } from "@/queries/queries";
import { MovieType, PersonType, ShowType } from "@/types/common";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import PersonPlaceholder from "../../../../public/images/personPlaceholder.png";

type Props = {
  query: string;
  open: boolean;
  setOpen: (e: boolean) => void;
};

const Search = ({ query, open, setOpen }: Props) => {
  const searchModalRef = useRef<HTMLDivElement | null>(null);
  const [searchResult, setSearchResult] = useState([]);
  const URL_IMAGE = process.env.NEXT_PUBLIC_URL_IMAGE;

  const fetchSearch = async () => {
    const res = await getSearch(query);
    setSearchResult(res);
  };

  useEffect(() => {
    if (!query.length) {
      setOpen(false);
      return;
    }

    const debounceTimeout = setTimeout(() => {
      fetchSearch();
      setOpen(true);
    }, 300);
    return () => clearTimeout(debounceTimeout);
  }, [query]);

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

  if (open) {
    return (
      <div className="bg-transparent absolute text-black h-screen w-full z-50 flex justify-center items-start">
        <div
          ref={searchModalRef}
          className="bg-primary md:border-secondary md:border text-white p-6 md:rounded-md md:mt-10 w-full lg:w-3/5 flex flex-col gap-4 relative md:mx-3 md:max-h-[80vh] overflow-auto"
        >
          <button
            className="absolute top-4 right-4 hidden md:block"
            onClick={() => setOpen(false)}
          >
            <RxCross1 />
          </button>
          {searchResult.map(
            (item: MovieType | ShowType | PersonType, index) => {
              if (
                (item.media_type === "movie" && item.poster_path) ||
                (item.media_type === "tv" && item.poster_path)
              ) {
                return (
                  <Link
                    href={`/${
                      item.media_type === "movie" ? "movies" : "shows"
                    }/${item.id}`}
                    key={item.id}
                    className={`flex gap-4 pb-4 ${
                      searchResult.length - 1 == index
                        ? ""
                        : "border-b border-secondary/50"
                    }`}
                  >
                    <img
                      className="h-28 aspect-[2/3]"
                      src={`${URL_IMAGE + item.poster_path}`}
                      alt={item.media_type === "movie" ? item.title : item.name}
                    />
                    <div>
                      {item.media_type === "tv" && (
                        <>
                          <h5 className="text-lg">{item.name}</h5>
                          <p className="text-sm text-lightGray">TV show</p>
                        </>
                      )}
                      {item.media_type === "movie" && (
                        <>
                          <h5 className="text-lg">{item.title}</h5>
                          <p className="text-sm text-lightGray">Movie</p>
                        </>
                      )}
                      <p className="text-sm text-lightGray line-clamp-3">
                        {item.overview}
                      </p>
                    </div>
                  </Link>
                );
              }
              if (item.media_type === "person") {
                return (
                  <Link
                    href={`/people/${item.id}`}
                    key={item.id}
                    className={`flex gap-4 pb-4 ${
                      searchResult.length - 1 == index
                        ? ""
                        : "border-b border-secondary/50"
                    }`}
                  >
                    {item.profile_path ? (
                      <img
                        className="h-28 aspect-[2/3]"
                        src={`${URL_IMAGE + item.profile_path}`}
                        alt={item.name}
                      />
                    ) : (
                      <Image
                        className="h-28 w-[75px]"
                        src={PersonPlaceholder}
                        alt={item.name}
                      />
                    )}
                    <div>
                      <h5 className="text-xl pb-2">{item.name}</h5>
                      <h6 className="text-sm text-lightGray">
                        {item.gender === 1 &&
                          item.known_for_department === "Acting" &&
                          "Actress"}
                        {item.gender === 2 &&
                          item.known_for_department === "Acting" &&
                          "Actor"}
                        {item.known_for_department === "Directing" &&
                          "Director"}
                      </h6>
                      <span className="flex text-sm text-lightGray">
                        <div>
                          {item.known_for.map(
                            (el: MovieType | ShowType, index: number) => {
                              return (
                                <span key={el.id}>
                                  {el.media_type === "movie"
                                    ? el.title
                                    : el.name}
                                  {item.known_for.length - 1 !== index && (
                                    <span>&#44;&nbsp;</span>
                                  )}
                                </span>
                              );
                            }
                          )}
                        </div>
                      </span>
                    </div>
                  </Link>
                );
              }
            }
          )}
          {searchResult.length === 0 && (
            <div>No results found for &quot;{query}&quot;</div>
          )}
        </div>
      </div>
    );
  }
};

export default Search;
