import HomeMovies from "@/components/HomeMovies";
import HomeShows from "@/components/HomeShows";
import Navbar from "@/components/Navbar";
import Sponsor from "@/components/Sponsor";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Sponsor />
      <HomeMovies />
      <HomeShows />
    </main>
  );
}
