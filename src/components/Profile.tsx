"use client";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import Container from "./ui/Container";

const Profile = () => {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) redirect("/");
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
        <div className="flex justify-center my-20 ">
          THIS IS THE PROFILE PAGE WIP
        </div>
      </div>
    </Container>
  );
};

export default Profile;
