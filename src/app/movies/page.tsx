import Footer from "@/components/Footer";
import Movies from "@/components/Movies";
import Header from "@/components/Header";
import React from "react";

const page = async () => {
  return (
    <main>
      <Header />
      <Movies />
      <Footer />
    </main>
  );
};

export default page;
