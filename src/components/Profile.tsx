"use client";
import { redirect, useRouter } from "next/navigation";
import React from "react";

const Profile = () => {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) redirect("/");
  return (
    <div className="w-full flex justify-center pt-10">
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
    </div>
  );
};

export default Profile;
