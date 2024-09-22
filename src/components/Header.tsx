"use client";

import { getSearch } from "@/queries/queries";
import { div } from "framer-motion/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import PersonPlaceholder from "../../public/images/personPlaceholder.png";
import Image from "next/image";
const Header = () => {
  const URL_IMAGE = process.env.NEXT_PUBLIC_URL_IMAGE;

  const [searchResult, setSearchResult] = useState([]);
  const [query, setQuery] = useState("");
  const links = [
    { label: "Movies", link: "/movies" },
    { label: "TV shows", link: "/shows" },
  ];

  const fetchSearch = async () => {
    const res = await getSearch(query);
    setSearchResult(res);
  };

  useEffect(() => {
    fetchSearch();
  }, [query]);

  console.log(searchResult, "result");

  return (
    <header className="md:block hidden">
      <div className="flex items-center justify-between py-4 px-4 lg:px-8 bg-primary">
        <Link href="/">
          <h1 className="text-3xl">Moviechase</h1>
        </Link>
        <div className="flex items-center gap-8">
          <nav className="flex gap-4">
            {links.map((item) => (
              <Link key={item.label} className="text-base" href={item.link}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="relative">
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a movie, tv show, person..."
              className="bg-white border border-gray-300 rounded-lg px-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-secondary text-black pr-10 min-w-[400px]"
            />
            <CiSearch className="absolute text-black top-1.5 right-2 size-7" />
          </div>
        </div>
      </div>
      {query && (
        <div className="bg-transparent absolute text-black h-screen w-full z-50 flex justify-center items-start">
          <div className="bg-primary border-secondary border text-white p-6 rounded-md mt-10 w-3/5 flex flex-col gap-4">
            {searchResult.map((item: any) => {
              if (
                (item.media_type === "movie" && item.poster_path) ||
                (item.media_type === "tv" && item.poster_path)
              ) {
                return (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-4 border-b border-secondary/50"
                  >
                    <img
                      className="h-28 aspect-[2/3]"
                      src={`${URL_IMAGE + item.poster_path}`}
                      alt={item.title}
                    />
                    <div>
                      <h5 className="text-lg">{item.name}</h5>
                      <h5 className="text-lg">{item.title}</h5>
                      {item.media_type === "tv" && (
                        <p className="text-sm text-lightGray">TV show</p>
                      )}
                      {item.media_type === "movie" && (
                        <p className="text-sm text-lightGray">Movie</p>
                      )}
                      <p className="text-sm text-lightGray line-clamp-3">
                        {item.overview}
                      </p>
                    </div>
                  </div>
                );
              }
              if (item.media_type === "person") {
                const knownFor = JSON.stringify(item.known_for);
                const knownForParsed = JSON.parse(knownFor);
                return (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-4 border-b border-secondary/50"
                  >
                    {item.profile_path ? (
                      <img
                        className="h-28 aspect-[2/3]"
                        src={`${URL_IMAGE + item.profile_path}`}
                        alt={item.title}
                      />
                    ) : (
                      <Image
                        className="h-28 w-[75px]"
                        src={PersonPlaceholder}
                        alt={item.title}
                      />
                    )}

                    <div>
                      <h5 className="text-xl pb-2">{item.name}</h5>
                      <h6 className="text-sm text-lightGray">
                        {" "}
                        {item.gender === 1 ? "Actress" : "Actor"}
                      </h6>
                      <span className="flex text-sm text-lightGray">
                        {knownForParsed.map((item: any, index: number) => {
                          return (
                            <div key={item.id}>
                              {item.title}
                              {knownForParsed.length - 1 !== index && ","}
                            </div>
                          );
                        })}
                      </span>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
