"use client";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Container from "./ui/Container";
import Image from "next/image";
import PersonPlaceholder from "../../public/images/profilePlaceholder.png";
import Grid from "./ui/Grid";

const Profile = () => {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) redirect("/");
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
            <div className="flex text-base">
              <span className="font-semibold">Name:&nbsp;</span>
              <p>John</p>
            </div>
            <div className="flex text-base">
              <span className="font-semibold">Surname:&nbsp;</span>
              <p>Doe</p>
            </div>
          </div>
          <div className="lg:hidden sm:col-span-8 col-span-4 w-full flex flex-col justify-center items-center">
            <div className="flex text-base">
              <span className="font-semibold">Name:&nbsp;</span>
              <p>John</p>
            </div>
            <div className="flex text-base">
              <span className="font-semibold">Surname:&nbsp;</span>
              <p>Doe</p>
            </div>
          </div>
        </Grid>
      </div>
    </Container>
  );
};

export default Profile;
