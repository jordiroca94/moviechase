import { MovieType } from "@/types/common";

type Props = {
  className?: string;
  type: "shows" | "movies" | "people";
} & Pick<MovieType, "id" | "poster_path" | "title">;

const Card = ({ className, id, poster_path, title, type }: Props) => {
  const URL_IMAGE = process.env.NEXT_PUBLIC_URL_IMAGE;
  return (
    <a className={className} href={`/${type}/${id}`}>
      <img
        className="transform scale-100 transition duration-300 ease-in-out sm:hover:scale-110"
        src={`${URL_IMAGE + poster_path}`}
        alt={title}
      />
      <h2 className="pt-6 pb-2">{title}</h2>
    </a>
  );
};

export default Card;
