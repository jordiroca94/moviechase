"use client";

import { useEffect, useState } from "react";
import Container from "./ui/Container";
import { getPopularMovies } from "@/queries/queries";
import Card from "./Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from "@/utils/slider";

type MovieType = {
  id: string;
  title: string;
  image: string;
  poster_path: string;
};

const HomeMovies = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const res = await getPopularMovies();
    setMovies(res);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Container>
      <h2 className="text-3xl pb-3 lg:pb-6">Movies</h2>
      <Slider {...settings}>
        {movies.map((movie: MovieType) => {
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
