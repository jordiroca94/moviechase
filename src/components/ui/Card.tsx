import { MovieType } from "@/types/common";

type Props = {
  className?: string;
  type: "shows" | "movies" | "people";
  vote_average?: number;
} & Pick<MovieType, "id" | "poster_path" | "title">;

const Card = ({
  className,
  id,
  poster_path,
  title,
  type,
  vote_average,
}: Props) => {
  const URL_IMAGE = process.env.NEXT_PUBLIC_URL_IMAGE;
  return (
    <a className={`${className} relative`} href={`/${type}/${id}`}>
      {vote_average! > 0 && (
        <div className="absolute top-2 right-2 z-10">
          <div
            className={`flex items-center justify-center text-secondary rounded-full w-10 h-10 shadow-lg bg-darkGray border-black `}
          >
            <span className="text-sm font-bold">
              {vote_average!.toFixed(1)}
            </span>
          </div>
        </div>
      )}
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
