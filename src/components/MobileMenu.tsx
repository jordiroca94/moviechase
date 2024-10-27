import Link from "next/link";
import React, { useEffect, useRef } from "react";

type Props = {
  links: { label: string; link: string }[];
  setMobileMenu: (e: boolean) => void;
};

const MobileMenu = ({ links, setMobileMenu }: Props) => {
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node)
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

  return (
    <div ref={mobileMenuRef} className="bg-primary">
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
