import Link from "next/link";

const Navbar = () => {
  const links = [
    { label: "Movies", link: "/" },
    { label: "TV shows", link: "/" },
    { label: "Contact", link: "/" },
  ];
  return (
    <div className="flex items-center justify-between py-4 px-4 lg:px-8">
      <Link href="/">
        <h1 className="text-3xl">Moviechase</h1>
      </Link>
      <div className="flex gap-4">
        {links.map((item) => (
          <Link className="" key={item.label} href={item.link}>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
