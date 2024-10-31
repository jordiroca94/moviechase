import Link from "next/link";
import React from "react";

type Props = {
  links: { label: string; link: string }[];
};

const MobileMenu = ({ links }: Props) => {
  return (
    <div className="bg-primary w-full">
      <nav className="flex flex-col items-center gap-4 pb-4 border-b border-secondary">
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
