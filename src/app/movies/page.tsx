import Footer from "@/components/Footer";
import Movies from "@/components/Movies";
import Navbar from "@/components/Navbar";
import React from "react";

const page = async () => {
  return (
    <main>
      <Navbar />
      <Movies />
      <Footer />
    </main>
  );
};

export default page;
