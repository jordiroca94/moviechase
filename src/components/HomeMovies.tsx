"use client";

import { useEffect, useState } from "react";
import Grid from "./ui/Grid";
import Container from "./ui/Container";
import { discoverMovies } from "@/queries/queries";
import Card from "./Card";

type MovieType = {
  id: string;
  title: string;
  image: string;
  poster_path: string;
};

const HomeMovies = () => {
  const URL_IMAGE = process.env.NEXT_PUBLIC_URL_IMAGE;

  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const res = await discoverMovies();
    setMovies(res);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Container>
      <Grid>
        <h2 className="col-span-full text-3xl">Movies</h2>
        {movies.slice(0, 6).map((movie: MovieType) => {
          return (
            <Card
              key={movie.id}
              id={movie.id}
              poster_path={movie.poster_path}
              title={movie.title}
            />
          );
        })}
      </Grid>
    </Container>
  );
};

export default HomeMovies;
