import Header from "@/components/Header";
import MovieDetail from "@/components/MovieDetail";

const page = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      <Header />
      <MovieDetail id={params.id} />
    </div>
  );
};

export default page;
