import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import MovieDetail from "@/components/movies/MovieDetail";

const page = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      <Header />
      <MovieDetail id={params.id} />
      <Footer />
    </div>
  );
};

export default page;
