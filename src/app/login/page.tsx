import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";

export default function page() {
  return (
    <main>
      <Header />
      <div className="flex flex-col h-screen justify-between">
        <LoginForm />
        <Footer />
      </div>
    </main>
  );
}
