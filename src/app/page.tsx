import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import HomeMovies from "@/components/movies/HomeMovies";
import HomeShows from "@/components/shows/HomeShows";

import Tmdb from "@/components/Tmdb";
import VideoHero from "@/components/VideoHero";

export default function Home() {
  return (
    <main>
      <Header />
      <VideoHero />
      <HomeMovies />
      <HomeShows />
      <Tmdb />
      <Footer />
    </main>
  );
}
