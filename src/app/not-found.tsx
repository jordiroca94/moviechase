import Header from "@/components/header/Header";

export default function NotFound() {
  return (
    <main className="h-screen flex flex-col">
      <Header />
      <div className="flex justify-center items-center gap-2 divide-x-2 flex-grow">
        <p className="text-lg sm:text-3xl pr-3 sm:pr-6">404</p>
        <h2 className="text-base sm:text-lg pl-3 sm:pl-6 text-center">
          This page could not be found.
        </h2>
      </div>
    </main>
  );
}
