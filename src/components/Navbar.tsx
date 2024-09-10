import Link from "next/link";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  const links = [
    { label: "Movies", link: "/movies" },
    { label: "TV shows", link: "/shows" },
  ];
  return (
    <div className="flex items-center justify-between py-4 px-4 lg:px-8 bg-primary">
      <Link href="/">
        <h1 className="text-3xl">Moviechase</h1>
      </Link>
      <div className="flex items-center gap-4">
        {links.map((item) => (
          <Link className="" key={item.label} href={item.link}>
            {item.label}
          </Link>
        ))}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-white border border-gray-300 rounded-lg px-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-secondary text-black pr-10"
          />
          <CiSearch className="absolute text-black top-1.5 right-2 size-7" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
