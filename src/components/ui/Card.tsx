import { MovieType } from "@/types/common";

type Props = {
  type: "show" | "movie";
} & Pick<MovieType, "id" | "poster_path" | "title">;

const Card = ({ id, poster_path, title, type }: Props) => {
  const URL_IMAGE = process.env.NEXT_PUBLIC_URL_IMAGE;
  return (
    <a href={`/${type === "movie" ? "movies" : "shows"}/${id}`}>
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
