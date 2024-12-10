"use client";
import Image from "next/image";
import PersonPlaceholder from "../../../public/images/personPlaceholder.png";
import { CreditsType } from "@/types/common";
import Link from "next/link";
import { useState } from "react";

type Props = {
  credits: CreditsType;
  imageAlt: string;
};

const Cast = ({ credits, imageAlt }: Props) => {
  const [morePersons, setMorePersons] = useState(8);
  const URL_IMAGE = process.env.NEXT_PUBLIC_URL_IMAGE;

  return (
    <div className="col-span-8">
      <p className="w-full font-bold text-2xl pt-3">Cast</p>
      <div className="w-full border-b border-lightGray py-3 grid grid-cols-8 gap-3">
        {credits?.cast.slice(0, morePersons).map((person) => (
          <Link
            key={person.id}
            className="col-span-4 lg:col-span-2"
            href={`/people/${person.id}`}
          >
            {person.profile_path ? (
              <img
                className="size-72 object-cover object-top sm:object-center lg:object-top"
                src={`${URL_IMAGE + person.profile_path}`}
                alt={imageAlt}
              />
            ) : (
              <Image
                className="size-72 object-cover object-top sm:object-center lg:object-top"
                src={PersonPlaceholder}
                alt={imageAlt}
              />
            )}
            <div className="font-bold pt-3">{person.name}</div>
            <div className="text-lightGray font-light pb-3">
              {person.character}
            </div>
          </Link>
        ))}
        {morePersons < credits?.cast.length && (
          <div className="col-span-full flex justify-center mb-3">
            <button
              onClick={() => setMorePersons(morePersons + 4)}
              className="hover:underline hover:text-secondary"
            >
              See More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cast;
