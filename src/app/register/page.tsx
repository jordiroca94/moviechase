import Header from "@/components/header/Header";
import RegisterForm from "@/components/RegisterForm";

export default function page() {
  return (
    <main>
      <Header />
      <div className="flex flex-col h-screen justify-between">
        <RegisterForm />
      </div>
    </main>
  );
}
