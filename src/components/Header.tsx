"use client";

import { getSearch } from "@/queries/queries";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

const Header = () => {
  const [searchResult, setSearchResult] = useState("");
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

  return (
    <header className="flex items-center justify-between py-4 px-4 lg:px-8 bg-primary">
      <Link href="/">
        <h1 className="text-3xl">Moviechase</h1>
      </Link>
      <div className="flex items-center gap-8">
        <nav className="flex gap-4">
          {links.map((item) => (
            <Link className="text-base" key={item.label} href={item.link}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="relative">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="bg-white border border-gray-300 rounded-lg px-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-secondary text-black pr-10"
          />
          <CiSearch className="absolute text-black top-1.5 right-2 size-7" />
        </div>
      </div>
    </header>
  );
};

export default Header;
