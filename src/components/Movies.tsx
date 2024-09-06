"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "./ui/Grid";
import Navbar from "./Navbar";
import Sponsor from "./Sponsor";
import Container from "./ui/Container";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/queries/queries";
import Slider from "react-slick";
import { settings } from "@/utils/slider";
import Card from "./Card";

type MovieType = {
  id: string;
  title: string;
  image: string;
  poster_path: string;
};

const Movies = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingPopularMovies] = useState([]);

  const fetchPopularMovies = async () => {
    const res = await getPopularMovies();
    setPopularMovies(res);
  };

  const fetchTopRatedMovies = async () => {
    const res = await getTopRatedMovies();
    setTopRatedPopularMovies(res);
  };

  const fetchUpcomingMovies = async () => {
    const res = await getUpcomingMovies();
    setUpcomingPopularMovies(res);
  };

  useEffect(() => {
    fetchPopularMovies();
    fetchTopRatedMovies();
    fetchUpcomingMovies();
  }, []);

  return (
    <Container>
      <h2 className="text-3xl pb-3 lg:pb-6">Popular</h2>
      <Slider {...settings}>
        {popularMovies.map((movie: MovieType) => {
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
      <h2 className="text-3xl pb-3 lg:pb-6 pt-10 lg:pt-16">Top rated</h2>
      <Slider {...settings}>
        {topRatedMovies.map((movie: MovieType) => {
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
      <h2 className="text-3xl pb-3 lg:pb-6 pt-10 lg:pt-16">Coming soon</h2>
      <Slider {...settings}>
        {upcomingMovies.map((movie: MovieType) => {
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

export default Movies;
