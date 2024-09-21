import Footer from "@/components/Footer";
import HomeMovies from "@/components/HomeMovies";
import HomeShows from "@/components/HomeShows";
import Header from "@/components/Header";
import Sponsor from "@/components/Sponsor";
import Tmdb from "@/components/Tmdb";

export default function Home() {
  return (
    <main>
      <Header />
      <Sponsor />
      <HomeMovies />
      <HomeShows />
      <Tmdb />
      <Footer />
    </main>
  );
}
