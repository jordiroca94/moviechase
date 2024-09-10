import Footer from "@/components/Footer";
import HomeMovies from "@/components/HomeMovies";
import HomeShows from "@/components/HomeShows";
import Navbar from "@/components/Navbar";
import Sponsor from "@/components/Sponsor";
import Tmdb from "@/components/Tmdb";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Sponsor />
      <HomeMovies />
      <HomeShows />
      <Tmdb />
      <Footer />
    </main>
  );
}
