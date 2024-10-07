import Footer from "@/components/Footer";
import Movies from "@/components/Movies";
import Header from "@/components/Header";
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
