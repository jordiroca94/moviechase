import Socials from "./Socials";

const Footer = () => {
  const year: number = new Date().getFullYear();

  return (
    <footer className="flex flex-col justify-center items-center py-10 gap-4 bg-primary">
      <Socials />
      <div className="text-base">
        &copy; {year} By{" "}
        <a
          className="hover:underline hover:text-secondary"
          href="https://jordirocasoler.com/"
        >
          Jordi Roca
        </a>
      </div>
    </footer>
  );
};

export default Footer;
