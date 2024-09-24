"use client";

import { getSearch } from "@/queries/queries";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import PersonPlaceholder from "../../public/images/personPlaceholder.png";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";
import { IoSearchSharp } from "react-icons/io5";
import { MovieType, PersonType, ShowType } from "@/types/common";

const Header = () => {
  const URL_IMAGE = process.env.NEXT_PUBLIC_URL_IMAGE;

  const [searchResult, setSearchResult] = useState([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);

  const links = [
    { label: "Movies", link: "/movies" },
    { label: "TV shows", link: "/shows" },
  ];

  const fetchSearch = async () => {
    const res = await getSearch(query);
    setSearchResult(res);
  };

  useEffect(() => {
    if (query.length) {
      fetchSearch();
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [query]);

  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
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
    <header>
      <div className="flex items-center justify-between py-5 md:py-4  px-4 lg:px-8 bg-primary">
        <Link href="/">
          <h5 className="text-xl md:text-3xl">Moviechase</h5>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="flex gap-4">
            {links.map((item) => (
              <Link key={item.label} className="text-base" href={item.link}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="relative md:block hidden">
            <input
              type="text"
              onFocus={() => query.length && setOpen(true)}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a movie, tv show, person..."
              className="bg-white border border-gray-300 rounded-lg px-4 py-1.5 focus:outline-none focus:ring-1 focus:ring-secondary text-black pr-10 min-w-[400px]"
            />
            <CiSearch className="absolute text-black top-2 right-2 size-6" />
          </div>
          <button onClick={() => setOpenMobile(true)} className="md:hidden">
            <IoSearchSharp className="size-5" />
          </button>
        </div>
      </div>
      {openMobile && (
        <div className="absolute top-0 inset-x-0 py-4 px-4 lg:px-8 bg-primary flex justify-between">
          <div className="relative">
            <input
              autoFocus
              type="text"
              onFocus={() => query.length && setOpen(true)}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a movie, tv show, person..."
              className="bg-transparent border border-gray-300 rounded-lg px-4 py-1.5 focus:outline-none focus:ring-1 focus:ring-secondary text-white pr-10 min-w-[300px]"
            />
            <CiSearch className="absolute text-white top-2 right-2 size-6" />
          </div>
          <button onClick={() => setOpenMobile(false)}>
            <RxCross1 />
          </button>
        </div>
      )}
      {open && (
        <div className="bg-transparent absolute text-black h-screen w-full z-50 flex justify-center items-start">
          <div
            ref={divRef}
            className="bg-primary md:border-secondary md:border text-white p-6 md:rounded-md md:mt-10 w-full lg:w-3/5 flex flex-col gap-4 relative"
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
                        alt={
                          item.media_type === "movie" ? item.title : item.name
                        }
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
                    <div
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
                    </div>
                  );
                }
              }
            )}
            {searchResult.length === 0 && (
              <div>No results found for &quot;{query}&quot;</div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
