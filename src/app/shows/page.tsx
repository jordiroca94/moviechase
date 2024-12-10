import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Shows from "@/components/shows/Shows";
import Sponsor from "@/components/Sponsor";
import React from "react";

const page = async () => {
  return (
    <main>
      <Header />
      <Sponsor />
      <Shows />
      <Footer />
    </main>
  );
};

export default page;
