import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import ShowsByGenre from "@/components/shows/ShowsByGenres";

const page = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      <Header />
      <ShowsByGenre id={params.id} />
      <Footer />
    </div>
  );
};

export default page;
