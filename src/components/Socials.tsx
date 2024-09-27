import { BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

const Socials = () => {
  return (
    <div className="flex gap-6">
      <a
        aria-label="Linkedin"
        href="https://www.linkedin.com/in/jordi-roca-soler/"
        target="_blank"
      >
        <BsLinkedin className="size-8 hover:text-primary hover:bg-white hover:border-white rounded-full hover:border transform duration-300" />
      </a>
      <a
        aria-label="Github"
        href="https://github.com/jordiroca94/moviechase"
        target="_blank"
      >
        <FaGithub className="size-8 hover:text-primary hover:bg-white hover:border-white hover:border rounded-full transform duration-300" />
      </a>
    </div>
  );
};

export default Socials;
