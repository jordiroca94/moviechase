"use client";

import { useEffect, useState } from "react";
import {
  getAiringShows,
  getAiringTodayShows,
  getPopularShows,
  getTopRatedShows,
} from "@/queries/queries";
import Slider from "react-slick";
import { settings } from "@/utils/slider";
import { ShowType } from "@/types/common";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "../ui/Container";
import Card from "../ui/Card";

const Shows = () => {
  const [popularShows, setPopularShows] = useState([]);
  const [topRatedShows, setTopRatedPopularShows] = useState([]);
  const [airingTodayShows, setAiringTodayShows] = useState([]);
  const [airingShows, setAiringShows] = useState([]);

  const fetchPopularShows = async () => {
    const res = await getPopularShows();
    setPopularShows(res);
  };

  const fetchTopRatedShows = async () => {
    const res = await getTopRatedShows();
    setTopRatedPopularShows(res);
  };

  const fetchAiringTodayShows = async () => {
    const res = await getAiringTodayShows();
    setAiringTodayShows(res);
  };

  const fetchAiringShows = async () => {
    const res = await getAiringShows();
    setAiringShows(res);
  };

  useEffect(() => {
    fetchPopularShows();
    fetchTopRatedShows();
    fetchAiringTodayShows();
    fetchAiringShows();
  }, []);

  return (
    <Container>
      <h2 className="text-3xl pb-3 lg:pb-6">Popular</h2>
      <Slider {...settings}>
        {popularShows.map((show: ShowType) => {
          return (
            <Card
              type="shows"
              key={show.id}
              id={show.id}
              poster_path={show.poster_path}
              title={show.name}
            />
          );
        })}
      </Slider>
      <h2 className="text-3xl pb-3 lg:pb-6 pt-10 lg:pt-16">Top rated</h2>
      <Slider {...settings}>
        {topRatedShows.map((show: ShowType) => {
          return (
            <Card
              type="shows"
              key={show.id}
              id={show.id}
              poster_path={show.poster_path}
              title={show.name}
            />
          );
        })}
      </Slider>
      <h2 className="text-3xl pb-3 lg:pb-6 pt-10 lg:pt-16">Featured today</h2>
      <Slider {...settings}>
        {airingTodayShows.map((show: ShowType) => {
          if (!show.poster_path) return null;
          return (
            <Card
              type="shows"
              key={show.id}
              id={show.id}
              poster_path={show.poster_path}
              title={show.name}
            />
          );
        })}
      </Slider>
      <h2 className="text-3xl pb-3 lg:pb-6 pt-10 lg:pt-16">
        In the next 7 days
      </h2>
      <Slider {...settings}>
        {airingShows.map((show: ShowType) => {
          return (
            <Card
              type="shows"
              key={show.id}
              id={show.id}
              poster_path={show.poster_path}
              title={show.name}
            />
          );
        })}
      </Slider>
    </Container>
  );
};

export default Shows;
