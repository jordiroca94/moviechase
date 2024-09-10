import React from "react";
import TMDB from "../../public/images/tmdb.jpeg";
import Image from "next/image";

const Tmdb = () => {
  return (
    <div className="flex gap-6 flex-col items-center justify-center py-10">
      <h3 className="text-xl uppercase">Developed with</h3>
      <a
        target="_blank"
        href="https://developer.themoviedb.org/reference/intro/getting-started"
      >
        <Image className="size-32" src={TMDB} alt="TMDB" />
      </a>
    </div>
  );
};

export default Tmdb;
