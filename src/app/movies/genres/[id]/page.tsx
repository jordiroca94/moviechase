import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import MoviesByGenres from "@/components/movies/MoviesByGenres";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <Header />
      <MoviesByGenres id={params.id} />
      <Footer />
    </div>
  );
};

export default page;
