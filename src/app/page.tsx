import Footer from "@/components/Footer";
import HomeMovies from "@/components/HomeMovies";
import HomeShows from "@/components/HomeShows";
import Header from "@/components/Header";
import Tmdb from "@/components/Tmdb";

export default function Home() {
  return (
    <main>
      <Header />
      <HomeMovies />
      <HomeShows />
      <Tmdb />
      <Footer />
    </main>
  );
}
