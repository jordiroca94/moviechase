import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import HomeMovies from "@/components/movies/HomeMovies";
import HomeShows from "@/components/shows/HomeShows";

import Tmdb from "@/components/Tmdb";
import Recommendation from "@/components/Recommendation";

export default function Home() {
  return (
    <main>
      <Header />
      <Recommendation />
      <HomeMovies />
      <HomeShows />
      <Tmdb />
      <Footer />
    </main>
  );
}
