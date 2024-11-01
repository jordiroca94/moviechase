import Link from "next/link";
import React from "react";

type Props = {
  links: { label: string; link: string }[];
};

const MobileMenu = ({ links }: Props) => {
  return (
    <div className="bg-primary w-full fixed top-0 pt-header z-0 ">
      <nav className="flex flex-col items-center gap-4 pb-4 pt-2 border-b border-secondary">
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
  );
};

export default MobileMenu;
