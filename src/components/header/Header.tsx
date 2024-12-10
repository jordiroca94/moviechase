"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import Image from "next/image";
import PersonPlaceholder from "../../../public/images/personPlaceholder.png";
import BurgerButton from "../ui/BurgerButton";
import MobileMenu from "./MobileMenu";
import SearchMobile from "./search/SearchMobile";
import Search from "./search/Search";
import SearchBar from "./search/SearchBar";

const Header = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const loginModalRef = useRef<HTMLDivElement | null>(null);

  const links = [
    { label: "Movies", link: "/movies" },
    { label: "TV shows", link: "/shows" },
  ];

  const handleClickOutside = (event: MouseEvent) => {
    if (
      loginModalRef.current &&
      !loginModalRef.current.contains(event.target as Node)
    ) {
      setMobileMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
  }, []);

  return (
    <header ref={loginModalRef} className="absolute top-0 w-full z-50">
      <div className="py-5 md:py-4 px-4 lg:px-8 bg-primary h-header">
        <div className="flex items-center justify-between relative z-40">
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
              <IoSearchSharp className="size-7" />
            </button>
            <BurgerButton
              mobileMenu={mobileMenu}
              setMobileMenu={setMobileMenu}
            />
          </div>
        </div>
      </div>
      {mobileMenu && <MobileMenu links={links} />}
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
