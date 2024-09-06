"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "./ui/Grid";
import Navbar from "./Navbar";
import Sponsor from "./Sponsor";
import Container from "./ui/Container";
import { discoverMovies } from "@/queries/queries";

type MovieType = {
  id: string;
  title: string;
  image: string;
  poster_path: string;
};

const Movies = () => {
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
        {movies.map((movie: MovieType) => {
          return (
            <div className="col-span-2" key={movie.id}>
              <img
                className=""
                src={`${URL_IMAGE + movie.poster_path}`}
                alt={movie.title}
              />
              <h2 className="py-2">{movie.title}</h2>
            </div>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Movies;
