"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "./ui/Grid";
import Navbar from "./Navbar";
import Sponsor from "./Sponsor";

type MovieType = {
  id: string;
  title: string;
  image: string;
  poster_path: string;
};

const HomeHero = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const URL_IMAGE = process.env.NEXT_PUBLIC_URL_IMAGE;

  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const {
      data: { results },
    } = await axios.get(`${API_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
      },
    });
    setMovies(results);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  console.log(movies, "Movies-->");

  return (
    <div>
      <Navbar />
      <Sponsor />
      <Grid>
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
    </div>
  );
};

export default HomeHero;
