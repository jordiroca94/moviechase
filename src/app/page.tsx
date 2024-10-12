import Footer from "@/components/Footer";
import HomeMovies from "@/components/HomeMovies";
import HomeShows from "@/components/HomeShows";
import Header from "@/components/Header";
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
