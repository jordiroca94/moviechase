import { PersonCastType, PersonCreditsType } from "@/types/common";
import dayjs from "dayjs";
import Link from "next/link";
import {
  FaSortAlphaUp,
  FaSortNumericUp,
  FaSortNumericUpAlt,
} from "react-icons/fa";
import RateStar from "../ui/RateStar";
import { useEffect, useState } from "react";
import { getPersonCredits } from "@/queries/queries";

const Filmography = ({ id }: { id: string }) => {
  const [filmography, setFilmography] = useState<PersonCastType[]>([]);
  const [credits, setCredits] = useState<PersonCreditsType>();

  const fetchPersonCredits = async () => {
    const res = await getPersonCredits(id);
    setCredits(res);
  };

  useEffect(() => {
    fetchPersonCredits();
  }, []);

  useEffect(() => {
    if (credits) {
      setFilmography(
        credits?.cast.sort(
          (a: PersonCastType, b: PersonCastType) =>
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime()
        )
      );
    }
  }, [credits]);

  if (filmography.length > 0) {
    return (
      <div className="col-span-full">
        <h2 className="text-2xl py-6">Films</h2>
        <div className="grid grid-cols-12 gap-4 border-b border-white pb-4 mb-4">
          <span className="col-span-2 sm:col-span-1">
            <button
              onClick={() =>
                setFilmography(
                  [...(filmography || [])].sort(
                    (a: PersonCastType, b: PersonCastType) =>
                      new Date(a.release_date).getTime() -
                      new Date(b.release_date).getTime()
                  )
                )
              }
              className="flex gap-2 items-center"
            >
              <FaSortNumericUp className="text-secondary" />
              <p>Year</p>
            </button>
          </span>
          <span className="col-span-9 sm:col-span-4">
            <button
              onClick={() =>
                setFilmography(
                  [...(filmography || [])].sort(
                    (a: PersonCastType, b: PersonCastType) =>
                      a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
                  )
                )
              }
              className="pl-2 md:pl-0 flex gap-2 items-center"
            >
              <FaSortAlphaUp className="text-secondary" />
              <p>Title</p>
            </button>
          </span>
          <span className="col-span-6 hidden sm:block">
            <button
              onClick={() =>
                setFilmography(
                  [...(filmography || [])].sort(
                    (a: PersonCastType, b: PersonCastType) =>
                      a.character.toLowerCase() > b.character.toLowerCase()
                        ? 1
                        : -1
                  )
                )
              }
              className="flex gap-2 items-center"
            >
              <FaSortAlphaUp className="text-secondary" />
              <p>Role</p>
            </button>
          </span>
          <span className="col-span-1 flex justify-end">
            <button
              onClick={() =>
                setFilmography(
                  [...(filmography || [])].sort(
                    (a: PersonCastType, b: PersonCastType) =>
                      b.vote_average - a.vote_average
                  )
                )
              }
              className="flex gap-2 items-center"
            >
              <FaSortNumericUpAlt className="text-secondary" />
              <p>Rate</p>
            </button>
          </span>
        </div>
        {filmography.map((item) => {
          if (
            !item.release_date.length ||
            item.vote_average === 0 ||
            item.vote_average === 10
          )
            return;
          return (
            <Link
              href={`/movies/${item.id}`}
              key={item.id}
              className="gap-4 py-2 grid grid-cols-12 hover:bg-darkGray"
            >
              <p className="col-span-2 sm:col-span-1">
                {dayjs(item.release_date).format("YYYY")}
              </p>
              <p className="col-span-9 sm:col-span-4 line-clamp-1 pr-6">
                {item.title}
              </p>
              <p className="col-span-6 line-clamp-1 hidden sm:block">
                {item.character}
              </p>
              <div className="col-span-1 flex justify-end">
                <RateStar averageRate={item.vote_average} />
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
};

export default Filmography;
