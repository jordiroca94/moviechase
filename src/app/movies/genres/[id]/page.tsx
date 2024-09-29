import MoviesByGenres from "@/components/MoviesByGenres";
import Header from "@/components/Header";

const page = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      <Header />
      <MoviesByGenres id={params.id} />
    </div>
  );
};

export default page;
