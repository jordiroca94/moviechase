"use client";

import { getShowGenre, getShows } from "@/queries/queries";
import Container from "./ui/Container";
import { useEffect, useState } from "react";
import { ShowType } from "@/types/common";
import Grid from "./ui/Grid";
import dayjs from "dayjs";
import Link from "next/link";
import RateStar from "./ui/RateStar";
import H1Title from "./ui/H1Title";
import Loader from "./ui/Loader";

const ShowsByGenre = ({ id }: { id: number }) => {
  const URL_IMAGE = process.env.NEXT_PUBLIC_URL_IMAGE;

  const [shows, setShows] = useState<ShowType[]>([]);
  const [genresList, setGenresList] =
    useState<{ id: number; name: string }[]>();
  const [page, setPage] = useState(1);

  const fetchShow = async () => {
    const newShows = await getShows(id, page);
    const allShows = [...shows, ...newShows];
    const removeDuplicates = allShows.filter(
      (show, index, self) => index === self.findIndex((m) => m.id === show.id)
    );
    setShows(removeDuplicates);
  };

  const fetchGenres = async () => {
    const res = await getShowGenre();
    setGenresList(res);
  };

  useEffect(() => {
    fetchShow();
    fetchGenres();
  }, [page]);

  if (shows && genresList) {
    const genre = genresList.filter((genre) => genre.id == id);

    return (
      <Container>
        <H1Title className="pb-6 mt-header">{genre[0].name}</H1Title>
        <Grid className="gap-8">
          {shows.map((item) => (
            <>
              <Link
                href={`/shows/${item.id}`}
                className="col-span-full lg:col-span-4"
                key={item.id}
              >
                <img
                  src={`${URL_IMAGE + item.backdrop_path}`}
                  alt={item.name}
                />
              </Link>
              <div className="col-span-full lg:col-span-8 flex justify-between flex-col">
                <Link
                  href={`/shows/${item.id}`}
                  className="flex flex-col gap-1"
                >
                  <div className="flex justify-between">
                    <p className="text-lg font-semibold">{item.name}</p>
                    <RateStar averageRate={item.vote_average} />
                  </div>
                  <p>{dayjs(item.first_air_date).format("YYYY")}</p>
                  <p className="line-clamp-4 lg:line-clamp-2 2xl:line-clamp-none">
                    {item.overview}
                  </p>
                </Link>
                <div className="py-3 flex gap-3 max-sm:w-full max-sm:overflow-hidden max-sm:overflow-x-scroll">
                  {item.genre_ids.map((item) => {
                    const iterationGenre = genresList.filter(
                      (el) => el.id === item
                    );
                    if (genre) {
                      return (
                        <Link
                          href={`/shows/genres/${item}`}
                          className="rounded-full border border-secondary/50 w-min px-5 py-1 hover:bg-secondary hover:text-primary whitespace-nowrap"
                          key={item}
                        >
                          {iterationGenre[0].name}
                        </Link>
                      );
                    }
                  })}
                </div>
              </div>
            </>
          ))}
          <div className="col-span-full flex justify-center">
            <button
              onClick={() => setPage(page + 1)}
              className="hover:underline hover:text-secondary"
            >
              See More
            </button>
          </div>
        </Grid>
      </Container>
    );
  } else {
    return <Loader className="h-screen" big />;
  }
};

export default ShowsByGenre;
