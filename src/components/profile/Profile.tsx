"use client";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Container from "../ui/Container";
import Image from "next/image";
import Grid from "../ui/Grid";
import { UserType } from "@/types/user";
import { IoMdSettings } from "react-icons/io";
import Link from "next/link";
import PersonPlaceholder from "../../../public/images/profilePlaceholder.png";
import { useDeleteModal } from "@/context/DeleteUserModalContext";
import {
  getAllFavouritesQuery,
  getMovie,
  getPerson,
  getShow,
} from "@/queries/queries";
import {
  MovieDetailType,
  PersonDetailType,
  ShowDetailType,
} from "@/types/common";
import Card from "../ui/Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Profile = () => {
  const router = useRouter();
  const [profileInfo, setProfileInfo] = useState<UserType>();
  const { openModal } = useDeleteModal();
  const [favouriteMovies, setFavouriteMovies] = useState<MovieDetailType[]>([]);
  const [favouriteMoviesData, setFavouriteMoviesData] = useState<
    MovieDetailType[]
  >([]);
  const [favouriteShows, setFavouriteShows] = useState<ShowDetailType[]>([]);
  const [favouriteShowsData, setFavouriteShowsData] = useState<
    ShowDetailType[]
  >([]);
  const [favouritePeople, setFavouritePeople] = useState<PersonDetailType[]>(
    []
  );
  const [favouritePeopleData, setFavouritePeopleData] = useState<
    PersonDetailType[]
  >([]);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (profileInfo?.id) {
      getFavouriteMovies();
      getFavouriteShows();
      getFavouritePeople();
    }
    if (!token) {
      redirect("/");
    } else {
      const user = localStorage.getItem("user");
      setProfileInfo(JSON.parse(user!));
    }
  }, [profileInfo?.id]);

  const getFavouriteMovies = async () => {
    try {
      const res = await getAllFavouritesQuery(profileInfo?.id!, "movie");
      const response = await res.json();
      if (res.ok) {
        setFavouriteMovies(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getFavouriteShows = async () => {
    try {
      const res = await getAllFavouritesQuery(profileInfo?.id!, "show");
      const response = await res.json();

      if (res.ok) {
        setFavouriteShows(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getFavouritePeople = async () => {
    try {
      const res = await getAllFavouritesQuery(profileInfo?.id!, "people");
      const response = await res.json();

      if (res.ok) {
        setFavouritePeople(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchShow = async (id: string) => {
    const res = await getShow(id);
    setFavouriteShowsData((prev) => [...prev, res]);
  };

  const getFavouriteShowsData = async () => {
    favouriteShows.map((show) => {
      fetchShow(show.id.toString());
    });
  };

  const fetchMovie = async (id: string) => {
    const res = await getMovie(id);
    setFavouriteMoviesData((prev) => [...prev, res]);
  };

  const getFavouriteMoviesData = async () => {
    favouriteMovies.map((movie) => {
      fetchMovie(movie.id.toString());
    });
  };

  const fetchPerson = async (id: string) => {
    const res = await getPerson(id);
    setFavouritePeopleData((prev) => [...prev, res]);
  };

  const getFavouritePeopleData = async () => {
    favouritePeople.map((person) => {
      fetchPerson(person.id.toString());
    });
  };

  useEffect(() => {
    getFavouriteMoviesData();
  }, [favouriteMovies]);

  useEffect(() => {
    getFavouriteShowsData();
  }, [favouriteShows]);

  useEffect(() => {
    getFavouritePeopleData();
  }, [favouritePeople]);

  return (
    <Container>
      <div className="w-full flex flex-col justify-center mt-12 lg:mt-8 relative ">
        <div className="w-full flex justify-end mr-10 gap-4">
          <button
            onClick={() => openModal()}
            className="bg-primary py-2 px-3 lg:px-4 rounded-lg border text-white border-white text-sm lg:text-base hover:bg-secondary flex gap-2 items-center"
          >
            Delete
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              router.replace("/");
            }}
            className="bg-secondary py-2 px-4 rounded-lg border text-white border-white hover:bg-primary"
          >
            Log out
          </button>
          <Link
            href="/profile/edit"
            className="bg-primary py-2 px-3 lg:px-4 rounded-lg border text-white border-white text-sm lg:text-base hover:bg-secondary flex gap-2 items-center"
          >
            <span>Edit profile</span>
            <IoMdSettings className="size-5 " />
          </Link>
        </div>
        <Grid className="my-16">
          <Image
            src={PersonPlaceholder}
            alt="Profile"
            className="rounded-full lg:col-span-2 lg:col-start-5 col-span-2 col-start-2  sm:col-start-4 aspect-square "
          />
          <div className="hidden lg:block lg:col-span-2">
            <div className="flex text-lg capitalize">
              <span className="font-semibold">Name:&nbsp;</span>
              <p>{profileInfo?.firstName}</p>
            </div>
            <div className="flex text-lg capitalize">
              <span className="font-semibold">Surname:&nbsp;</span>
              <p>{profileInfo?.lastName}</p>
            </div>
            <div className="flex text-lg">
              <span className="font-semibold">Email:&nbsp;</span>
              <p>{profileInfo?.email}</p>
            </div>
          </div>
          <div className="lg:hidden sm:col-span-8 col-span-4 w-full flex flex-col justify-center items-center">
            <div className="flex text-lg capitalize">
              <span className="font-semibold">Name:&nbsp;</span>
              <p>{profileInfo?.firstName}</p>
            </div>
            <div className="flex text-lg capitalize">
              <span className="font-semibold">Surname:&nbsp;</span>
              <p>{profileInfo?.lastName}</p>
            </div>
            <div className="flex text-lg">
              <span className="font-semibold">Email:&nbsp;</span>
              <p>{profileInfo?.email}</p>
            </div>
          </div>
        </Grid>
        {favouriteMoviesData.length > 0 && (
          <Grid className="my-4">
            <h2 className="text-3xl pb-3 lg:pb-6 col-span-full">
              Favourite movies
            </h2>
            {favouriteMoviesData.map((movie) => (
              <Card
                className="col-span-2"
                type="movies"
                key={movie.id}
                id={movie.id}
                poster_path={movie.poster_path}
                title={movie.title}
              />
            ))}
          </Grid>
        )}
        {favouriteShowsData.length > 0 && (
          <Grid className="my-4">
            <h2 className="text-3xl pb-3 lg:pb-6 col-span-full">
              Favourite shows
            </h2>
            {favouriteShowsData.map((show) => (
              <Card
                className="col-span-2"
                type="shows"
                key={show.id}
                id={show.id}
                poster_path={show.poster_path}
                title={show.name}
              />
            ))}
          </Grid>
        )}
        {favouritePeopleData.length > 0 && (
          <Grid className="my-4">
            <h2 className="text-3xl pb-3 lg:pb-6 col-span-full">
              Favourite people
            </h2>
            {favouritePeopleData.map((person) => (
              <Card
                className="col-span-2"
                type="people"
                key={person.id}
                id={person.id}
                poster_path={person.profile_path}
                title={person.name}
              />
            ))}
          </Grid>
        )}
      </div>
    </Container>
  );
};

export default Profile;
