import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Shows from "@/components/Shows";
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
