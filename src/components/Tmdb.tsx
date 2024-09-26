import Image from "next/image";
import TMDB from "../../public/images/tmdb.jpeg";
import BorderAnimation from "./ui/BorderAnimation";

const Tmdb = () => {
  return (
    <a
      target="_blank"
      href="https://developer.themoviedb.org/reference/intro/getting-started"
    >
      <BorderAnimation>
        <div className="flex gap-6 flex-col items-center justify-center py-10">
          <h3 className="text-xl uppercase">Developed with</h3>
          <Image className="size-32" src={TMDB} alt="TMDB" />
        </div>
      </BorderAnimation>
    </a>
  );
};

export default Tmdb;
