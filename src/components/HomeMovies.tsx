"use client";

import { useEffect, useState } from "react";
import Container from "./ui/Container";
import { getPopularMovies } from "@/queries/queries";
import Card from "./Card";
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
    <Container>
      <h2 className="text-3xl pb-3 lg:pb-6">Most popular movies</h2>
      <Slider {...settings}>
        {movies.map((movie) => {
          if (!movie.poster_path) return null;
          return (
            <Card
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
