"use client";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Container from "./ui/Container";
import Image from "next/image";
import PersonPlaceholder from "../../public/images/profilePlaceholder.png";
import Grid from "./ui/Grid";
import { ProfileInfo } from "@/types/user";

const Profile = () => {
  const router = useRouter();
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) redirect("/");
    setProfileInfo(JSON.parse(localStorage.getItem("user") || "{}"));
  }, []);

  return (
    <Container>
      <div className="w-full flex flex-col justify-center mt-header">
        <div className="w-full flex justify-end mr-10">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              router.replace("/");
            }}
            className="bg-secondary py-2 px-4 rounded-lg border text-white border-white hover:bg-primary"
          >
            Log out
          </button>
        </div>
        <Grid className="my-20">
          <Image
            src={PersonPlaceholder}
            alt="Profile"
            className="rounded-full lg:col-span-2 lg:col-start-5 col-span-4 sm:col-start-3 aspect-square"
          />
          <div className="hidden lg:block lg:col-span-2">
            <div className="flex text-lg capitalize">
              <span className="font-semibold">Name:&nbsp;</span>
              <p>{profileInfo?.first_name}</p>
            </div>
            <div className="flex text-lg capitalize">
              <span className="font-semibold">Surname:&nbsp;</span>
              <p>{profileInfo?.last_name}</p>
            </div>
            <div className="flex text-lg">
              <span className="font-semibold">Email:&nbsp;</span>
              <p>{profileInfo?.email}</p>
            </div>
          </div>
          <div className="lg:hidden sm:col-span-8 col-span-4 w-full flex flex-col justify-center items-center">
            <div className="flex text-lg capitalize">
              <span className="font-semibold">Name:&nbsp;</span>
              <p>{profileInfo?.first_name}</p>
            </div>
            <div className="flex text-lg capitalize">
              <span className="font-semibold">Surname:&nbsp;</span>
              <p>{profileInfo?.last_name}</p>
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
