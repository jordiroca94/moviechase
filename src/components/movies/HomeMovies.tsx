"use client";

import { useEffect, useState } from "react";
import Container from "../ui/Container";
import { getPopularMovies } from "@/queries/queries";
import Card from "../ui/Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from "@/utils/slider";
import { MovieType } from "@/types/common";

const HomeMovies = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);

  const fetchMovies = async () => {
    const res = await getPopularMovies();
    setMovies(res);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Container className="mt-24 md:mt-0">
      <h2 className="text-3xl pb-3 lg:pb-6">Most popular movies</h2>
      <Slider {...settings}>
        {movies.map((movie) => {
          if (!movie.poster_path) return null;
          return (
            <Card
              type="movies"
              key={movie.id}
              id={movie.id}
              poster_path={movie.poster_path}
              title={movie.title}
            />
          );
        })}
      </Slider>
    </Container>
  );
};

export default HomeMovies;
