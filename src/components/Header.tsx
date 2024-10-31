"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import SearchBar from "./search/SearchBar";
import Search from "./search/Search";
import SearchMobile from "./search/SearchMobile";
import Image from "next/image";
import PersonPlaceholder from "../../public/images/profilePlaceholder.png";
import BurgerButton from "./ui/BurgerButton";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [token, setToken] = useState(null);

  const links = [
    { label: "Movies", link: "/movies" },
    { label: "TV shows", link: "/shows" },
  ];

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    // @ts-ignore
    setToken(savedToken);
  }, []);

  return (
    <header className="absolute top-0 w-full">
      <div className="flex items-center justify-between py-5 md:py-4  px-4 lg:px-8 bg-primary">
        <Link href="/">
          <h5 className="text-xl lg:text-3xl">Moviechase</h5>
        </Link>
        <div className="flex items-center gap-5">
          <div className="hidden lg:block">
            <nav className="flex gap-4">
              {links.map((item) => (
                <Link
                  key={item.label}
                  className="text-base hover:text-secondary"
                  href={item.link}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <SearchBar query={query} setOpen={setOpen} setQuery={setQuery} />
          {token ? (
            <Link href="/profile">
              <Image
                className="rounded-full size-8"
                src={PersonPlaceholder}
                alt="ProfileImage"
              />
            </Link>
          ) : (
            <>
              <Link
                href="/register"
                className="hidden sm:block bg-secondary py-2 px-3 lg:px-4 rounded-lg border text-white border-white text-sm lg:text-base hover:bg-primary"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="bg-primary py-2 px-3 lg:px-4 rounded-lg border text-white border-white text-sm lg:text-base hover:bg-secondary"
              >
                Login
              </Link>
            </>
          )}
          <button onClick={() => setOpenMobile(true)} className="md:hidden">
            <IoSearchSharp className="size-5" />
          </button>
          <BurgerButton mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
        </div>
      </div>
      {mobileMenu && <MobileMenu links={links} setMobileMenu={setMobileMenu} />}
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
