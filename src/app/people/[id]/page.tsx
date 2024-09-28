import Header from "@/components/Header";
import PersonDetail from "@/components/PersonDetail";

const page = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      <Header />
      <PersonDetail id={params.id} />
    </div>
  );
};

export default page;
