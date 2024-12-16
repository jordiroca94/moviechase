import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import ShowDetail from "@/components/shows/ShowDetail";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <Header />
      <ShowDetail id={params.id} />
      <Footer />
    </div>
  );
};

export default page;
