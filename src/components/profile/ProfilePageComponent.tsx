"use client";
import React from "react";
import Header from "../Header";
import Profile from "./Profile";
import Footer from "../Footer";
import DeleteUserModal from "./DeleteUserModal";
import { DeleteModalProvider } from "@/context/DeleteUserModalContext";

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
