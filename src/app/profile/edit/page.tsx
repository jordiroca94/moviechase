import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import EditProfile from "@/components/profile/EditProfile";

const page = async () => {
  return (
    <main className="h-screen flex flex-col justify-between">
      <div>
        <Header />
        <EditProfile />
      </div>
      <Footer />
    </main>
  );
};

export default page;
