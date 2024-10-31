import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RegisterForm from "@/components/RegisterForm";

export default function page() {
  return (
    <main>
      <Header />
      <div className="flex flex-col h-screen justify-between">
        <RegisterForm />
        <Footer />
      </div>
    </main>
  );
}
