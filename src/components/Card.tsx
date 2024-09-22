import { MovieType } from "@/types/common";

const Card = ({ id, poster_path, title }: MovieType) => {
  const URL_IMAGE = process.env.NEXT_PUBLIC_URL_IMAGE;
  return (
    <div>
      <img src={`${URL_IMAGE + poster_path}`} alt={title} />
      <h2 className="py-2">{title}</h2>
    </div>
  );
};

export default Card;
