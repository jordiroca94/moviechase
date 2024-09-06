import Movies from "@/components/Movies";
import Navbar from "@/components/Navbar";
import React from "react";

const page = async () => {
  return (
    <main>
      <Navbar />
      <Movies />
    </main>
  );
};

export default page;
