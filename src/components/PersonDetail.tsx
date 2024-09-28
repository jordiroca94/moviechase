"use client";
import { useEffect, useState } from "react";
import Container from "./ui/Container";
import { getPersonCredits, getPersonImages } from "@/queries/queries";
import {
  PersonCastType,
  PersonCreditsType,
  PersonImagesType,
} from "@/types/common";
import Grid from "./ui/Grid";
import PersonInformation from "./PersonInformation";
import Slider from "react-slick";
import { imagesSettings } from "@/utils/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dayjs from "dayjs";
import Link from "next/link";
import RateStar from "./ui/RateStar";
import { FaSortAlphaUp } from "react-icons/fa";
import { FaSortNumericUpAlt } from "react-icons/fa";
import { FaSortNumericUp } from "react-icons/fa";

const PersonDetail = ({ id }: { id: number }) => {
  const URL_IMAGE = process.env.NEXT_PUBLIC_URL_IMAGE;

  const [images, setImages] = useState<PersonImagesType>();
  const [credits, setCredits] = useState<PersonCreditsType>();
  const [filmography, setFilmography] = useState<any>();

  const fetchPersonImages = async () => {
    const res = await getPersonImages(id);
    setImages(res);
  };

  const fetchPersonCredits = async () => {
    const res = await getPersonCredits(id);
    setCredits(res);
  };

  useEffect(() => {
    fetchPersonImages();
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

  if (images && credits && filmography) {
    return (
      <Container>
        <PersonInformation id={id} />
        <div className="col-span-full">
          <h2 className="text-2xl py-6">Filmography</h2>
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
          {filmography.map((item: any) => {
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
        <Grid>
          {images.profiles.length > 3 && (
            <div className="col-span-full">
              <h2 className="text-2xl col-span-full py-10">Images</h2>
              <Slider {...imagesSettings}>
                {images.profiles.map((image, index) => {
                  return (
                    <img
                      key={image.file_path}
                      src={`${URL_IMAGE + image.file_path}`}
                      alt={`Image-${index}`}
                    />
                  );
                })}
              </Slider>
            </div>
          )}
        </Grid>
      </Container>
    );
  }
};

export default PersonDetail;
