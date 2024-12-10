"use client";
import {
  getShow,
  getShowCredits,
  getShowImages,
  getShowVideos,
} from "@/queries/queries";
import { useEffect, useState } from "react";
import {
  CreditsType,
  ImageType,
  ShowDetailType,
  VideoType,
} from "@/types/common";
import dayjs from "dayjs";
import formatTime from "@/utils/formatTime";
import { FaArrowTrendUp } from "react-icons/fa6";
import Link from "next/link";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { FaRegImages } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "../ui/Container";
import H1Title from "../ui/H1Title";
import RateStar from "../ui/RateStar";
import Trailer from "../Trailer";
import StickySection from "../StickySection";
import Cast from "../people/Cast";
import Videos from "../Videos";
import Images from "../Images";
import Related from "../Related";
import Loader from "../ui/Loader";

const ShowDetail = ({ id }: { id: number }) => {
  const URL_IMAGE = process.env.NEXT_PUBLIC_URL_IMAGE;

  const [show, setShow] = useState<ShowDetailType>();
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [images, setImages] = useState<ImageType>();
  const [credits, setCredits] = useState<CreditsType>();

  const fetchShow = async () => {
    const res = await getShow(id);
    setShow(res);
  };

  const fetchVideos = async () => {
    const res = await getShowVideos(id);
    setVideos(res);
  };
  const fetchImages = async () => {
    const res = await getShowImages(id);
    setImages(res);
  };

  const fetchCredits = async () => {
    const res = await getShowCredits(id);
    setCredits(res);
  };

  useEffect(() => {
    fetchShow();
    fetchVideos();
    fetchImages();
    fetchCredits();
  }, []);

  if (show && videos && images) {
    return (
      <Container>
        <div className="grid grid-cols-8 lg:grid-cols-12 mt-header">
          <div className="col-span-8 sm:col-span-full flex justify-between">
            <div className="flex flex-col">
              <H1Title>{show.name}</H1Title>
              <div className="text-lightGray text-sm py-3">
                <div className="flex gap-2">
                  <p>{dayjs(show.first_air_date).format("YYYY")}</p> -{" "}
                  <p>{dayjs(show.last_air_date).format("YYYY")}</p>
                  <p>{show.number_of_seasons} Seasons</p>
                  <p>{show.number_of_episodes} Episodes</p>
                  {show.episode_run_time[0] && (
                    <p>{formatTime(show.episode_run_time[0])}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="hidden lg:flex gap-8">
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="uppercase text-lightGray">Rating</div>
                <RateStar averageRate={show.vote_average} outOfTen />
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="uppercase text-lightGray">Popularity</div>
                <div className="flex items-center gap-2">
                  <div className="border border-secondary rounded-full p-1">
                    <FaArrowTrendUp className="text-secondary size-4" />
                  </div>
                  <div>{show.popularity}</div>
                </div>
              </div>
            </div>
          </div>
          <img
            className="hidden sm:block sm:col-span-2 lg:col-span-3"
            src={`${URL_IMAGE + show.poster_path}`}
            alt={show.name}
          />
          <Trailer
            videos={videos}
            backupImage={show.backdrop_path}
            imageAlt={show.name}
          />
          <div className="flex lg:flex-col col-span-full lg:col-span-2 gap-2">
            <Link
              href="#show-videos"
              className="w-1/2 lg:w-auto lg:h-1/2 bg-darkGray flex justify-center items-center hover:bg-mediumGray"
            >
              <div className="py-3 flex lg:flex-col items-center gap-4 text-sm lg:text-base">
                <MdOutlineVideoLibrary className="text-secondary size-6" />
                <div> {videos.length} VIDEOS</div>
              </div>
            </Link>
            <Link
              href="#show-images"
              className="w-1/2 lg:w-auto lg:h-1/2 bg-darkGray flex justify-center items-center hover:bg-mediumGray"
            >
              <div className="py-3 flex lg:flex-col items-center gap-4 text-sm lg:text-base">
                <FaRegImages className="text-secondary size-6" />
                {images.backdrops.length
                  ? images.backdrops.length
                  : images.posters.length
                  ? images.posters.length
                  : images.logos.length && images.logos.length}{" "}
                PHOTOS
              </div>
            </Link>
          </div>
          <div className="col-span-full flex py-6 gap-4 max-sm:w-full max-sm:overflow-hidden max-sm:overflow-x-scroll">
            {show.genres.map((item) => (
              <Link
                href={`/shows/genres/${item.id}`}
                className="rounded-full border border-secondary/50 w-min px-5 py-1 hover:bg-secondary hover:text-primary whitespace-nowrap"
                key={item.id}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="col-span-full grid grid-cols-8 sm:grid-cols-12 ">
            <div className="col-span-8 border-b border-lightGray pb-3">
              {show.overview}
            </div>
            <StickySection type="show" id={id} />
            <div className="col-span-8 lg:hidden flex items-center pt-4 gap-4 border-b border-lightGray pb-3">
              <RateStar averageRate={show.vote_average} outOfTen />
              <div className="flex items-center gap-2">
                <FaArrowTrendUp className="text-secondary size-4" />
                <div>{show.popularity}</div>
              </div>
            </div>
            {show.created_by[0]?.id && (
              <div className="col-span-8 border-b border-lightGray py-3">
                <div className="flex gap-2">
                  <p className="font-bold">Director</p>
                  <Link href={`/people/${show.created_by[0].id}`}>
                    {show.created_by[0].name}
                  </Link>
                </div>
              </div>
            )}
            <Cast credits={credits!} imageAlt={show.name} />
          </div>
          <Videos videos={videos} />
        </div>
        <Images id="show-images" images={images} alt={show.name} />
        <Related type="show" id={id} />
      </Container>
    );
  } else {
    return <Loader className="h-screen" big />;
  }
};

export default ShowDetail;
