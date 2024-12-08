import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PersonDetail from "@/components/PersonDetail";

const page = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      <Header />
      <PersonDetail id={params.id} />
      <Footer />
    </div>
  );
};

export default page;
