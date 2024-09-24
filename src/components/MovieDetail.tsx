"use client";
import { useEffect, useState } from "react";
import Container from "./ui/Container";
import {
  getMovie,
  getMovieCredits,
  getMovieImages,
  getMovieVideos,
} from "@/queries/queries";
import dayjs from "dayjs";
import { FaArrowTrendUp } from "react-icons/fa6";
import { TbStarFilled } from "react-icons/tb";
import Link from "next/link";
import Slider from "react-slick";
import { imagesSettings } from "@/utils/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MovieDetail = ({ id }: { id: number }) => {
  const URL_IMAGE = process.env.NEXT_PUBLIC_URL_IMAGE;

  const [movie, setMovie] = useState<any>();
  const [videos, setVideos] = useState<any>();
  const [images, setImages] = useState<any>();
  const [credits, setCredits] = useState<any>();
  const [moreVideos, setMoreVideos] = useState(2);
  const fetchMovies = async () => {
    const res = await getMovie(id);
    setMovie(res);
  };

  const fetchVideos = async () => {
    const res = await getMovieVideos(id);
    setVideos(res);
  };

  const fetchImages = async () => {
    const res = await getMovieImages(id);
    setImages(res);
  };

  const fetchCredits = async () => {
    const res = await getMovieCredits(id);
    setCredits(res);
  };

  useEffect(() => {
    fetchMovies();
    fetchVideos();
    fetchImages();
    fetchCredits();
  }, []);
  if (movie && videos && images) {
    const director =
      credits.crew &&
      credits.crew.filter((person: any) => person.job === "Director");
    const writer =
      credits.crew &&
      credits.crew.filter((person: any) => person.department === "Writing");
    return (
      <Container>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12">
          <div className="col-span-full flex justify-between">
            <div className="flex flex-col">
              <h1 className="text-5xl">{movie.title}</h1>
              <div className="text-lightGray text-sm py-3">
                <p className="text-lightGray">
                  Original title: {movie.original_title}
                </p>
                <p>{dayjs(movie.release_date).format("YYYY")}</p>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="uppercase text-lightGray">Rating</div>
                <div className="flex items-center gap-2">
                  <TbStarFilled className="text-secondary size-4" />
                  <div className="flex gap-1">
                    <div className="font-bold">
                      {movie.vote_average.toFixed(1)}
                    </div>
                    <div className="text-lightGray">/ 10</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="uppercase text-lightGray">Popularity</div>
                <div className="flex items-center gap-2">
                  <div className="border border-secondary rounded-full p-1">
                    <FaArrowTrendUp className="text-secondary size-4" />
                  </div>
                  <div>{movie.popularity}</div>
                </div>
              </div>
            </div>
          </div>
          <img
            className="col-span-3"
            src={`${URL_IMAGE + movie.poster_path}`}
            alt={movie.title}
          />
          <div className="col-span-7">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videos[0].key}`}
              title={videos[0].name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="flex flex-col col-span-2 gap-2">
            <Link
              href="#movie-videos"
              className="h-1/2 bg-darkGray flex justify-center items-center hover:bg-mediumGray"
            >
              {videos.length} VIDEOS
            </Link>
            <Link
              href="#movie-images"
              className="h-1/2 bg-darkGray flex justify-center items-center hover:bg-mediumGray"
            >
              {images.backdrops.length
                ? images.backdrops.length
                : images.posters.length
                ? images.posters.length
                : images.logos.length && images.logos.length}{" "}
              PHOTOS
            </Link>
          </div>
          <div className="col-span-full flex py-6 gap-4">
            {movie.genres.map((item: any) => (
              <div
                className="rounded-full border border-secondary/50 w-min px-5 py-1 hover:bg-secondary hover:text-primary whitespace-nowrap"
                key={item.id}
              >
                {item.name}
              </div>
            ))}
          </div>
          <div className="col-span-8 border-b border-lightGray pb-3">
            {movie.overview}
          </div>
          <div className="col-span-8 border-b border-lightGray py-3">
            <div className="flex gap-2">
              <p className="font-bold">Director</p>
              <Link href={`/person/${director[0].id}`}>{director[0].name}</Link>
            </div>
          </div>
          <div className="col-span-8 border-b border-lightGray py-3">
            <div className="flex gap-2">
              <p className="font-bold">Writter</p>
              {writer.map((person: any) => (
                <Link key={person.id} href={`/person/${person.id}`}>
                  {person.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="col-span-8">
            <p className="font-bold pt-3">Cast</p>
          </div>
          <div className="col-span-8 border-b border-lightGray py-3 grid grid-cols-8 gap-3">
            {credits.cast.slice(0, 8).map((person: any) => (
              <Link
                key={person.id}
                className="col-span-2"
                href={`/person/${person.id}`}
              >
                {person.profile_path && (
                  <img
                    className="size-72 object-cover object-top"
                    src={`${URL_IMAGE + person.profile_path}`}
                    alt={movie.title}
                  />
                )}
                <div className="font-bold pt-3">{person.name}</div>
                <div className="text-lightGray font-light pb-3">
                  {person.character}
                </div>
              </Link>
            ))}
          </div>
          <h2 className="text-2xl col-span-full pt-4">Videos</h2>
          <div
            id="movie-videos"
            className="col-span-full grid grid-cols-12 gap-4 lg:gap-10"
          >
            {videos.slice(0, moreVideos).map((video: any) => (
              <iframe
                key={video.id}
                className="col-span-6 aspect-video"
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video.key}`}
                title={video.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ))}
            {moreVideos < videos.length && (
              <div className="col-span-full flex justify-center">
                <button
                  onClick={() => setMoreVideos(moreVideos + 2)}
                  className="hover:underline"
                >
                  See More
                </button>
              </div>
            )}
          </div>
        </div>
        <h2 id="movie-images" className="text-2xl col-span-full pt-10 pb-4">
          Images
        </h2>
        <Slider {...imagesSettings}>
          {images.backdrops.map((image: any) => {
            return (
              <img
                key={image.file_path}
                src={`${URL_IMAGE + image.file_path}`}
                alt={movie.title}
              />
            );
          })}
        </Slider>
      </Container>
    );
  }
};

export default MovieDetail;
