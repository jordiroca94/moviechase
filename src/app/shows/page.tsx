import Navbar from "@/components/Navbar";
import Shows from "@/components/Shows";
import React from "react";

const page = async () => {
  return (
    <main>
      <Navbar />
      <Shows />
    </main>
  );
};

export default page;
