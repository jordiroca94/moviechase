import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import Profile from "@/components/profile/Profile";

const page = async () => {
  return (
    <main className="h-screen flex flex-col justify-between">
      <div>
        <Header />
        <Profile />
      </div>
      <Footer />
    </main>
  );
};

export default page;
