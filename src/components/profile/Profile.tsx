"use client";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Container from "../ui/Container";
import Image from "next/image";
import Grid from "../ui/Grid";
import { UserType } from "@/types/user";
import { IoMdSettings } from "react-icons/io";
import Link from "next/link";
import { useDeleteModal } from "@/context/DeleteUserModalContext";
import {
  getAllFavouritesQuery,
  getMovie,
  getPerson,
  getShow,
  getUserQuery,
  getWatchlistQuery,
} from "@/queries/queries";
import {
  ListItemType,
  MovieDetailType,
  PersonDetailType,
  ShowDetailType,
} from "@/types/common";
import Card from "../ui/Card";
import { FieldUpload } from "./FieldUpload";

const Profile = () => {
  const router = useRouter();
  const [profileInfo, setProfileInfo] = useState<UserType>();
  const { openModal } = useDeleteModal();
  const [favouriteMovies, setFavouriteMovies] = useState<ListItemType[]>([]);
  const [favouriteMoviesData, setFavouriteMoviesData] = useState<
    MovieDetailType[]
  >([]);
  const [favouriteShows, setFavouriteShows] = useState<ListItemType[]>([]);
  const [favouriteShowsData, setFavouriteShowsData] = useState<
    ShowDetailType[]
  >([]);
  const [favouritePeople, setFavouritePeople] = useState<ListItemType[]>([]);
  const [favouritePeopleData, setFavouritePeopleData] = useState<
    PersonDetailType[]
  >([]);
  const [watchlist, setWatchlist] = useState<ListItemType[]>([]);
  const [watchlistData, setWatchlistData] = useState<
    MovieDetailType[] | ShowDetailType[]
  >([]);
  const [userImage, setUserImage] = useState("");
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (profileInfo?.id) {
      getFavouriteMovies();
      getFavouriteShows();
      getFavouritePeople();
      getWatchlist();
      getUserData();
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

  const getWatchlist = async () => {
    try {
      const res = await getWatchlistQuery(profileInfo?.id!);
      const response = await res.json();

      if (res.ok) {
        setWatchlist(response);
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
    if (!favouriteShows) return;
    favouriteShows.map((show) => {
      fetchShow(show.id.toString());
    });
  };

  const fetchMovie = async (id: string) => {
    const res = await getMovie(id);
    setFavouriteMoviesData((prev) => [...prev, res]);
  };

  const getFavouriteMoviesData = async () => {
    if (!favouriteMovies) return;
    favouriteMovies.map((movie) => {
      fetchMovie(movie.id.toString());
    });
  };

  const fetchPerson = async (id: string) => {
    const res = await getPerson(id);
    setFavouritePeopleData((prev) => [...prev, res]);
  };

  const getFavouritePeopleData = async () => {
    if (!favouritePeople) return;
    favouritePeople.map((person) => {
      fetchPerson(person.id.toString());
    });
  };

  const fetchWatchlistItem = async (id: string, type: string) => {
    if (type === "movie") {
      const res = await getMovie(id);
      setWatchlistData((prev) => [...prev, res]);
    } else {
      const res = await getShow(id);
      setWatchlistData((prev) => [...prev, res]);
    }
  };

  const getWatchlistData = async () => {
    if (!watchlist) return;
    watchlist.map((element) => {
      fetchWatchlistItem(element.id.toString(), element.type);
    });
  };

  const getUserData = async () => {
    try {
      const res = await getUserQuery(profileInfo?.id!);
      const response = await res.json();
      if (res.ok) {
        setUserImage(response.image);
      }
    } catch (error) {
      console.error(error);
    }
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

  useEffect(() => {
    getWatchlistData();
  }, [watchlist]);

  return (
    <Container>
      <div className="w-full flex flex-col justify-center mt-12 lg:mt-8 relative ">
        <div className="w-full flex flex-col sm:flex-row justify-end mr-10 gap-4">
          <button
            onClick={() => openModal()}
            className="bg-primary py-2.5 px-3 lg:px-4 rounded-lg border text-white border-white text-sm lg:text-base hover:bg-secondary flex justify-center gap-2 items-center"
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
            className="bg-primary py-2.5 px-3 lg:px-4 rounded-lg border text-white border-white text-sm lg:text-base hover:bg-secondary flex justify-center items-center"
          >
            <div className="flex gap-2">
              <span>Edit profile</span>
              <IoMdSettings className="size-5 hidden sm:block" />
            </div>
          </Link>
        </div>
        <Grid className="my-16">
          <div className="relative lg:col-span-2 lg:col-start-5 col-span-2 col-start-2 sm:col-start-4">
            <Image
              src={userImage}
              width={200}
              height={200}
              alt="Profile"
              className="rounded-full aspect-square object-cover "
            />
            {profileInfo?.id && (
              <div className="absolute bottom-0 right-0">
                <FieldUpload id={profileInfo.id} />
              </div>
            )}
          </div>
          {profileInfo && (
            <>
              <div className="hidden lg:block lg:col-span-2">
                <div className="flex text-lg capitalize">
                  <span className="font-semibold">Name:&nbsp;</span>
                  <p>{profileInfo.firstName}</p>
                </div>
                <div className="flex text-lg capitalize">
                  <span className="font-semibold">Surname:&nbsp;</span>
                  <p>{profileInfo.lastName}</p>
                </div>
                <div className="flex text-lg">
                  <span className="font-semibold">Email:&nbsp;</span>
                  <p>{profileInfo.email}</p>
                </div>
              </div>
              <div className="lg:hidden sm:col-span-8 col-span-4 w-full flex flex-col justify-center items-center">
                <div className="flex text-lg capitalize">
                  <span className="font-semibold">Name:&nbsp;</span>
                  <p>{profileInfo.firstName}</p>
                </div>
                <div className="flex text-lg capitalize">
                  <span className="font-semibold">Surname:&nbsp;</span>
                  <p>{profileInfo.lastName}</p>
                </div>
                <div className="flex text-lg">
                  <span className="font-semibold">Email:&nbsp;</span>
                  <p>{profileInfo.email}</p>
                </div>
              </div>
            </>
          )}
        </Grid>
        {watchlistData.length > 0 && (
          <Grid className="my-4">
            <h2 className="text-3xl pb-3 lg:pb-6 col-span-full">Watchlist</h2>
            {watchlistData.map((item) => (
              <Card
                className="col-span-2"
                type={"title" in item ? "movies" : "shows"}
                key={item.id}
                id={item.id}
                poster_path={item.poster_path}
                title={"title" in item ? item.title : item.name}
                vote_average={item.vote_average}
              />
            ))}
          </Grid>
        )}
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
                vote_average={movie.vote_average}
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
                vote_average={show.vote_average}
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
