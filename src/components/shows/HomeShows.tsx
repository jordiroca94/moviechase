"use client";

import { useEffect, useState } from "react";
import { getPopularShows } from "@/queries/queries";
import Slider from "react-slick";
import { settings } from "@/utils/slider";
import { ShowType } from "@/types/common";
import Container from "../ui/Container";
import Card from "../ui/Card";

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
        {shows.map((show: ShowType) => {
          if (!show.poster_path) return null;
          return (
            <Card
              type="show"
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

export default HomeShows;
