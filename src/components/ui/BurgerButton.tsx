"use client";
import { FC } from "react";

type Props = {
  mobileMenu: boolean;
  setMobileMenu: (value: boolean) => void;
  className?: string;
};

const BurgerButton: FC<Props> = ({
  mobileMenu,
  setMobileMenu,
  className = "",
}) => {
  return (
    <div
      className={`${className} flex lg:hidden h-[22px] w-[22px] flex-col justify-center`}
      onClick={() => setMobileMenu(!mobileMenu)}
    >
      <div
        className={`h-px w-full flex-none bg-white transition-all ease-in-out ${
          mobileMenu
            ? "translate-y-px rotate-[45deg] delay-300 duration-300"
            : ""
        }`}
      />
      <div
        className={`h-px w-0 flex-none bg-white transition-all duration-300 ease-in-out ${
          mobileMenu ? "my-0 pr-0" : "my-[49%] pr-[100%] delay-300"
        }`}
      />
      <div
        className={`h-px w-full flex-none bg-white transition-all ease-in-out ${
          mobileMenu
            ? "-translate-y-px rotate-[-45deg] delay-300 duration-300"
            : ""
        }`}
      />
    </div>
  );
};

export default BurgerButton;
