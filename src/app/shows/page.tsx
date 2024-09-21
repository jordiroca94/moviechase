import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Shows from "@/components/Shows";
import React from "react";

const page = async () => {
  return (
    <main>
      <Header />
      <Shows />
      <Footer />
    </main>
  );
};

export default page;
