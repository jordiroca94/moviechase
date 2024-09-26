"use client";

import Link from "next/link";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import SearchBar from "./search/SearchBar";
import Search from "./search/Search";
import SearchMobile from "./search/SearchMobile";

const Header = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  const links = [
    { label: "Movies", link: "/movies" },
    { label: "TV shows", link: "/shows" },
  ];

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
          <SearchBar query={query} setOpen={setOpen} setQuery={setQuery} />
          <button onClick={() => setOpenMobile(true)} className="md:hidden">
            <IoSearchSharp className="size-5" />
          </button>
        </div>
      </div>
      {openMobile && (
        <SearchMobile
          query={query}
          setOpen={setOpen}
          setOpenMobile={setOpenMobile}
          setQuery={setQuery}
        />
      )}
      <Search query={query} open={open} setOpen={setOpen} />
    </header>
  );
};

export default Header;
