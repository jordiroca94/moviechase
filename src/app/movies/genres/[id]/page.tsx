import MoviesByGenres from "@/components/MoviesByGenres";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const page = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      <Header />
      <MoviesByGenres id={params.id} />
      <Footer />
    </div>
  );
};

export default page;
