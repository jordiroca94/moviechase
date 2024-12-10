"use client";
import React from "react";
import Profile from "./Profile";
import DeleteUserModal from "./DeleteUserModal";
import { DeleteModalProvider } from "@/context/DeleteUserModalContext";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const ProfilePageComponent = () => {
  return (
    <DeleteModalProvider>
      <main className="h-screen flex flex-col justify-between relative">
        <div>
          <Header />
          <Profile />
        </div>
        <Footer />
        <DeleteUserModal />
      </main>
    </DeleteModalProvider>
  );
};

export default ProfilePageComponent;
