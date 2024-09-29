"use client";

import { getPopularMovies, getPopularShows } from "@/queries/queries";
import { MovieType, ShowType } from "@/types/common";
import Link from "next/link";
import { useEffect, useState } from "react";
import RateStar from "./ui/RateStar";

type Props = {
  id: number;
  type: "movie" | "show";
};

const StickySection = ({ id, type }: Props) => {
  const URL_IMAGE = process.env.NEXT_PUBLIC_URL_IMAGE;

  const [mostPopular, setMostPopular] = useState<MovieType[] | ShowType[]>([]);

  const fetchPopularShows = async () => {
    const res = await getPopularShows();
    setMostPopular(res);
  };

  const fetchPopularMovies = async () => {
    const res = await getPopularMovies();
    setMostPopular(res);
  };

  useEffect(() => {
    if (type === "movie") {
      fetchPopularMovies();
    } else {
      fetchPopularShows();
    }
  }, []);

  return (
    <div className="hidden sm:block justify-center col-span-4 row-span-5 lg:row-span-4 relative">
      <div className="sticky pl-10 lg:pl-6 top-16 flex flex-col items-center">
        <h3 className="text-2xl pb-4">Most popular</h3>
        <div className="flex flex-col gap-4">
          {mostPopular.slice(0, 4)?.map((item) => {
            if (item.id == id) return;
            return (
              <Link
                href={`/${type === "movie" ? "movies" : "shows"}/${item.id}`}
                className="flex items-center gap-4"
                key={item.id}
              >
                <img
                  className="sm:size-24 lg:size-32 rounded-full object-cover"
                  src={`${URL_IMAGE + item.backdrop_path}`}
                  alt={
                    type === "movie"
                      ? (item as MovieType).title
                      : (item as ShowType).name
                  }
                />
                <div className="flex flex-col gap-2">
                  <p>
                    {type === "movie"
                      ? (item as MovieType).title
                      : (item as ShowType).name}
                  </p>
                  <RateStar averageRate={item.vote_average} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StickySection;
