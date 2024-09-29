import Header from "@/components/Header";
import ShowsByGenre from "@/components/ShowsByGenres";

const page = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      <Header />
      <ShowsByGenre id={params.id} />
    </div>
  );
};

export default page;
