import React from "react";
import EditProfile from "@/components/profile/EditProfile";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

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
