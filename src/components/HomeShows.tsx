"use client";

import { useEffect, useState } from "react";
import Container from "./ui/Container";
import { getPopularShows } from "@/queries/queries";
import Slider from "react-slick";
import { settings } from "@/utils/slider";
import Card from "./Card";
import { ShowType } from "@/types/common";

const HomeShows = () => {
  const [shows, setShows] = useState([]);

  const fetchShows = async () => {
    const res = await getPopularShows();
    setShows(res);
  };

  useEffect(() => {
    fetchShows();
  }, []);

  return (
    <Container className="pb-12 lg:pb-12">
      <h2 className="text-3xl pb-3 lg:pb-6">Most popular shows</h2>
      <Slider {...settings}>
        {shows.map((movie: ShowType) => {
          if (!movie.poster_path) return null;
          return (
            <Card
              key={movie.id}
              id={movie.id}
              poster_path={movie.poster_path}
              title={movie.name}
            />
          );
        })}
      </Slider>
    </Container>
  );
};

export default HomeShows;
