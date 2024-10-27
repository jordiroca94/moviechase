import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import Profile from "@/components/Profile";

const page = async () => {
  return (
    <main>
      <Header />
      <Profile />
      <Footer />
    </main>
  );
};

export default page;
