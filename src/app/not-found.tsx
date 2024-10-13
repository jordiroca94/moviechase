import Header from "@/components/Header";
export default function NotFound() {
  return (
    <main>
      <Header />
      <div className="grid place-items-center h-screen">
        <div className="flex justify-center items-center gap-2 divide-x-2">
          <p className="text-lg sm:text-3xl pr-3 sm:pr-6">404</p>
          <h2 className="text-base sm:text-lg pl-3 sm:pl-6 text-center">
            This page could not be found.
          </h2>
        </div>
      </div>
    </main>
  );
}
