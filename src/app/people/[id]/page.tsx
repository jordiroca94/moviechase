import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import PersonDetail from "@/components/people/PersonDetail";

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
