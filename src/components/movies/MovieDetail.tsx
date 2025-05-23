"use client";
import { useEffect, useState } from "react";
import Container from "../ui/Container";
import {
  getFavouriteQuery,
  getMovie,
  getMovieCredits,
  getMovieImages,
  getMovieVideos,
  getWatchedQuery,
} from "@/queries/queries";
import dayjs from "dayjs";
import { FaArrowTrendUp } from "react-icons/fa6";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  CreditsType,
  ImageType,
  MovieDetailType,
  VideoType,
} from "@/types/common";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { FaRegImages } from "react-icons/fa6";
import formatTime from "@/utils/formatTime";
import RateStar from "../ui/RateStar";
import Trailer from "../Trailer";
import Videos from "../Videos";
import Cast from "../people/Cast";
import StickySection from "../StickySection";
import Images from "../Images";
import Loader from "../ui/Loader";
import H1Title from "../ui/H1Title";
import Related from "../Related";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { UserType } from "@/types/user";
import {
  addToListMutation,
  removeFromListMutation,
} from "@/mutations/mutations";
import Providers from "../Providers";

const MovieDetail = ({ id }: { id: string }) => {
  const URL_IMAGE = process.env.NEXT_PUBLIC_URL_IMAGE;

  const [movie, setMovie] = useState<MovieDetailType>();
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [images, setImages] = useState<ImageType>();
  const [credits, setCredits] = useState<CreditsType>();
  const [isFavourite, setIsFavourite] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);
  const [profileInfo, setProfileInfo] = useState<UserType>();

  const fetchMovie = async () => {
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
    fetchMovie();
    fetchVideos();
    fetchImages();
    fetchCredits();
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setProfileInfo(JSON.parse(user!));
    if (profileInfo?.id) {
      getFavourite();
      getWatched();
    }
  }, [profileInfo?.id]);

  const getFavourite = async () => {
    try {
      const res = await getFavouriteQuery(profileInfo?.id!, "movie", id);
      if (res.ok) {
        setIsFavourite(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromFavourites = async () => {
    try {
      const res = await removeFromListMutation(
        profileInfo?.id!,
        id,
        "movie",
        "favourites"
      );
      if (res.ok) {
        setIsFavourite(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToFavourites = async () => {
    try {
      const res = await addToListMutation(
        profileInfo?.id!,
        id,
        "movie",
        "favourites"
      );
      if (res.ok) {
        setIsFavourite(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getWatched = async () => {
    try {
      const res = await getWatchedQuery(profileInfo?.id!, "movie", id);
      if (res.ok) {
        setIsWatchlist(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromWatchlist = async () => {
    try {
      const res = await removeFromListMutation(
        profileInfo?.id!,
        id,
        "movie",
        "watchlist"
      );
      if (res.ok) {
        setIsWatchlist(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToWatchlist = async () => {
    try {
      const res = await addToListMutation(
        profileInfo?.id!,
        id,
        "movie",
        "watchlist"
      );
      if (res.ok) {
        setIsWatchlist(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (movie && videos && images) {
    const director = credits?.crew.filter(
      (person) => person.job === "Director"
    );
    const writer = credits?.crew.filter(
      (person) => person.department === "Writing"
    );

    return (
      <Container>
        <div className="grid grid-cols-8 lg:grid-cols-12 mt-12 lg:mt-8">
          <div className="col-span-8 sm:col-span-full flex justify-between">
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-center">
                <H1Title>{movie.title}</H1Title>
                {profileInfo && (
                  <div className="gap-2 flex lg:hidden">
                    {isWatchlist ? (
                      <button onClick={() => removeFromWatchlist()}>
                        <IoIosRemoveCircleOutline className="size-6 text-secondary" />
                      </button>
                    ) : (
                      <button onClick={() => handleAddToWatchlist()}>
                        <IoIosAddCircleOutline className="size-6 text-secondary" />
                      </button>
                    )}
                    {isFavourite ? (
                      <button onClick={() => removeFromFavourites()}>
                        <FaHeart className="size-6 text-secondary" />
                      </button>
                    ) : (
                      <button onClick={() => handleAddToFavourites()}>
                        <FaRegHeart className="size-6 text-secondary" />
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="text-lightGray text-sm py-3">
                <p className="text-lightGray">
                  Original title: {movie.original_title}
                </p>
                <div className="flex gap-2">
                  <p>{dayjs(movie.release_date).format("YYYY")}</p> -
                  <p>{formatTime(movie.runtime)}</p>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex gap-8">
              {profileInfo && (
                <>
                  <div className="flex flex-col justify-center items-center gap-2 ">
                    <div className="uppercase text-lightGray">Watchlist </div>
                    {isWatchlist ? (
                      <button onClick={() => removeFromWatchlist()}>
                        <IoIosRemoveCircleOutline className="size-6 text-secondary" />
                      </button>
                    ) : (
                      <button onClick={() => handleAddToWatchlist()}>
                        <IoIosAddCircleOutline className="size-6 text-secondary" />
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col justify-center items-center gap-2">
                    <div className="uppercase text-lightGray">Favourites </div>
                    {isFavourite ? (
                      <button onClick={() => removeFromFavourites()}>
                        <FaHeart className="size-6 text-secondary" />
                      </button>
                    ) : (
                      <button onClick={() => handleAddToFavourites()}>
                        <FaRegHeart className="size-6 text-secondary" />
                      </button>
                    )}
                  </div>
                </>
              )}
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="uppercase text-lightGray">Rating</div>
                <RateStar averageRate={movie.vote_average} outOfTen />
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="uppercase text-lightGray">Popularity</div>
                <div className="flex items-center gap-2">
                  <div className="border border-secondary rounded-full p-1">
                    <FaArrowTrendUp className="text-secondary size-4" />
                  </div>
                  <div>{Math.round(movie.popularity)}</div>
                </div>
              </div>
            </div>
          </div>
          <img
            className="hidden sm:block sm:col-span-2 lg:col-span-3"
            src={`${URL_IMAGE + movie.poster_path}`}
            alt={movie.title}
          />
          <Trailer
            videos={videos}
            backupImage={movie.backdrop_path}
            imageAlt={movie.title}
          />
          <div className="flex lg:flex-col col-span-full lg:col-span-2 gap-2">
            <Link
              href="#movie-videos"
              className="w-1/2 lg:w-auto lg:h-1/2 bg-darkGray flex justify-center items-center hover:bg-mediumGray"
            >
              <div className="py-3 flex lg:flex-col items-center gap-4 text-sm lg:text-base">
                <MdOutlineVideoLibrary className="text-secondary size-6" />
                <div> {videos.length} VIDEOS</div>
              </div>
            </Link>
            <Link
              href="#movie-images"
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
            {movie.genres.map((item) => (
              <Link
                href={`/movies/genres/${item.id}`}
                className="rounded-full border border-secondary/50 w-min px-5 py-1 hover:bg-secondary hover:text-primary whitespace-nowrap"
                key={item.id}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="col-span-full grid grid-cols-8 sm:grid-cols-12 ">
            <div className="col-span-8 border-b border-lightGray pb-3">
              {movie.overview}
            </div>
            <StickySection type="movie" id={id} />
            <div className="col-span-8 lg:hidden flex items-center pt-4 gap-4 border-b border-lightGray pb-3">
              <RateStar averageRate={movie.vote_average} outOfTen />
              <div className="flex items-center gap-2">
                <FaArrowTrendUp className="text-secondary size-4" />
                <div>{Math.round(movie.popularity)}</div>
              </div>
            </div>
            {director && (
              <div className="col-span-8 border-b border-lightGray py-3">
                <div className="flex gap-2">
                  <p className="font-bold">Director</p>
                  <Link
                    className="hover:underline"
                    href={`/people/${director[0].id}`}
                  >
                    {director[0].name}
                  </Link>
                </div>
              </div>
            )}
            <div className="col-span-8 border-b border-lightGray py-3">
              <div className="flex gap-2">
                <p className="font-bold">Writer</p>
                <div className="flex gap-3">
                  <div>
                    {writer?.slice(0, 2).map((person) => (
                      <span key={person.id}>
                        <Link
                          className="hover:underline"
                          href={`/people/${person.id}`}
                        >
                          {person.name}{" "}
                        </Link>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Providers id={id} type="movie" />
            <Cast credits={credits!} imageAlt={movie.title} />
          </div>
          <Videos videos={videos} id="movie-videos" />
        </div>
        <Images id="movie-images" images={images} alt={movie.title} />
        <Related type="movie" id={id} />
      </Container>
    );
  } else {
    return <Loader className="h-screen" big />;
  }
};

export default MovieDetail;
