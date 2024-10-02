import { getRelatedMovies, getRelatedtShows } from "@/queries/queries";
import { MovieType, ShowType } from "@/types/common";
import { imagesSettings } from "@/utils/slider";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import Card from "./Card";

type Props = {
  id: number;
  type: "movie" | "show";
};

const Related = ({ id, type }: Props) => {
  const [items, setItems] = useState<MovieType[] | ShowType[]>([]);
  const fetchRelatedShows = async () => {
    const res = await getRelatedtShows(id);
    setItems(res);
  };

  const fetchRelatedMovies = async () => {
    const res = await getRelatedMovies(id);
    setItems(res);
  };

  useEffect(() => {
    if (type === "movie") {
      fetchRelatedMovies();
    } else {
      fetchRelatedShows();
    }
  }, []);
  return (
    <div className="sm:hidden">
      <h2 className="text-2xl col-span-full py-10">Related {type}s</h2>
      <Slider {...imagesSettings}>
        {items.map((item) => {
          if (!item.poster_path) return null;
          return (
            <Card
              type="movie"
              key={item.id}
              id={item.id}
              poster_path={item.poster_path}
              title={
                type === "movie"
                  ? (item as MovieType).title
                  : (item as ShowType).name
              }
            />
          );
        })}
      </Slider>
    </div>
  );
};

export default Related;
