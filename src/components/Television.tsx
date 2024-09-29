"use client";
import { PersonTVCastType, PersonTVCreditsType } from "@/types/common";
import dayjs from "dayjs";
import Link from "next/link";
import {
  FaSortAlphaUp,
  FaSortNumericUp,
  FaSortNumericUpAlt,
} from "react-icons/fa";
import RateStar from "./ui/RateStar";
import { useEffect, useState } from "react";
import { getPersonTVCredits } from "@/queries/queries";

const Television = ({ id }: { id: number }) => {
  const [tvShows, setTvShows] = useState<PersonTVCastType[]>([]);
  const [credits, setCredits] = useState<PersonTVCreditsType>();

  const fetchPersonTVCredits = async () => {
    const res = await getPersonTVCredits(id);
    setCredits(res);
  };

  useEffect(() => {
    fetchPersonTVCredits();
  }, []);

  useEffect(() => {
    if (credits) {
      setTvShows(
        credits?.cast.sort(
          (a: PersonTVCastType, b: PersonTVCastType) =>
            new Date(a.first_air_date).getTime() -
            new Date(b.first_air_date).getTime()
        )
      );
    }
  }, [credits]);
  return (
    <div className="col-span-full">
      <h2 className="text-2xl py-6">Television</h2>
      <div className="grid grid-cols-12 gap-4 border-b border-white pb-4 mb-4">
        <span className="col-span-2 sm:col-span-1">
          <button
            onClick={() =>
              setTvShows(
                [...(tvShows || [])].sort(
                  (a: PersonTVCastType, b: PersonTVCastType) =>
                    new Date(a.first_air_date).getTime() -
                    new Date(b.first_air_date).getTime()
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
              setTvShows(
                [...(tvShows || [])].sort(
                  (a: PersonTVCastType, b: PersonTVCastType) =>
                    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
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
              setTvShows(
                [...(tvShows || [])].sort(
                  (a: PersonTVCastType, b: PersonTVCastType) =>
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
              setTvShows(
                [...(tvShows || [])].sort(
                  (a: PersonTVCastType, b: PersonTVCastType) =>
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
      {tvShows.map((item, index) => {
        if (
          !item.first_air_date.length ||
          item.vote_average === 0 ||
          item.vote_average === 10
        )
          return;
        return (
          <Link
            href={`/shows/${item.id}`}
            key={index}
            className="gap-4 py-2 grid grid-cols-12 hover:bg-darkGray"
          >
            <p className="col-span-2 sm:col-span-1">
              {dayjs(item.first_air_date).format("YYYY")}
            </p>
            <p className="col-span-9 sm:col-span-4 line-clamp-1 pr-6">
              {item.name}
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
};

export default Television;
