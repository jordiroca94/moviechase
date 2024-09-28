import Header from "@/components/Header";
import ShowDetail from "@/components/ShowDetail";

const page = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      <Header />
      <ShowDetail id={params.id} />
    </div>
  );
};

export default page;
