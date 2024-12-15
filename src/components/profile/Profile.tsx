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
const Profile = () => {
  const router = useRouter();
  const [profileInfo, setProfileInfo] = useState<UserType>();
  const { openModal } = useDeleteModal();
  const movieChaseApiUrl = process.env.NEXT_PUBLIC_MOVIECHASE_API_URL;
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [favouriteShows, setFavouriteShows] = useState([]);
  const [favouritePeople, setFavouritePeople] = useState([]);

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
      const res = await fetch(
        `${movieChaseApiUrl}/api/v1/favourites?user_id=${profileInfo?.id}&type=movie`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
      const res = await fetch(
        `${movieChaseApiUrl}/api/v1/favourites?user_id=${profileInfo?.id}&type=show`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
      const res = await fetch(
        `${movieChaseApiUrl}/api/v1/favourites?user_id=${profileInfo?.id}&type=people`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = await res.json();

      if (res.ok) {
        setFavouritePeople(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // TODOS: REFACTOR: Movies id typed as number it is a string
  // Abstract the fav fetch request to be in queries or mutations
  // Wishlist rename to watchlist

  console.log(favouriteMovies, favouriteShows, favouritePeople, "----------->");

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
      </div>
    </Container>
  );
};

export default Profile;
