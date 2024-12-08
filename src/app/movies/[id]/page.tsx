import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MovieDetail from "@/components/MovieDetail";

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
