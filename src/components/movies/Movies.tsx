"use client";

import { useEffect, useState } from "react";
import Container from "../ui/Container";
import {
  getPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/queries/queries";
import Slider from "react-slick";
import { settings } from "@/utils/slider";
import Card from "../ui/Card";
import { MovieType } from "@/types/common";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Movies = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingPopularMovies] = useState([]);
  const [playingMovies, setPlayingPopularMovies] = useState([]);

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

  const fetchPlayingMovies = async () => {
    const res = await getPlayingMovies();
    setPlayingPopularMovies(res);
  };

  useEffect(() => {
    fetchPopularMovies();
    fetchTopRatedMovies();
    fetchUpcomingMovies();
    fetchPlayingMovies();
  }, []);

  return (
    <Container>
      <h2 className="text-3xl pb-3 lg:pb-6">Popular</h2>
      <Slider {...settings}>
        {popularMovies.map((movie: MovieType) => {
          return (
            <Card
              type="movies"
              key={movie.id}
              id={movie.id}
              poster_path={movie.poster_path}
              title={movie.title}
              vote_average={movie.vote_average}
            />
          );
        })}
      </Slider>
      <h2 className="text-3xl pb-3 lg:pb-6 pt-10 lg:pt-16">Top rated</h2>
      <Slider {...settings}>
        {topRatedMovies.map((movie: MovieType) => {
          return (
            <Card
              type="movies"
              key={movie.id}
              id={movie.id}
              poster_path={movie.poster_path}
              title={movie.title}
              vote_average={movie.vote_average}
            />
          );
        })}
      </Slider>
      <h2 className="text-3xl pb-3 lg:pb-6 pt-10 lg:pt-16">Coming soon</h2>
      <Slider {...settings}>
        {upcomingMovies.map((movie: MovieType) => {
          return (
            <Card
              type="movies"
              key={movie.id}
              id={movie.id}
              poster_path={movie.poster_path}
              title={movie.title}
              vote_average={movie.vote_average}
            />
          );
        })}
      </Slider>
      <h2 className="text-3xl pb-3 lg:pb-6 pt-10 lg:pt-16">In cinemas</h2>
      <Slider {...settings}>
        {playingMovies.map((movie: MovieType) => {
          return (
            <Card
              type="movies"
              key={movie.id}
              id={movie.id}
              poster_path={movie.poster_path}
              title={movie.title}
              vote_average={movie.vote_average}
            />
          );
        })}
      </Slider>
    </Container>
  );
};

export default Movies;
