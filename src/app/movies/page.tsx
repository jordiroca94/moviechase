import Footer from "@/components/footer/Footer";
import Movies from "@/components/movies/Movies";
import Header from "@/components/header/Header";
import React from "react";
import Sponsor from "@/components/Sponsor";

const page = async () => {
  return (
    <main>
      <Header />
      <Sponsor />
      <Movies />
      <Footer />
    </main>
  );
};

export default page;
