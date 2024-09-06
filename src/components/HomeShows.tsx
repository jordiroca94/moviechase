"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "./ui/Grid";
import Navbar from "./Navbar";
import Sponsor from "./Sponsor";
import Container from "./ui/Container";
import { discoverShows } from "@/queries/queries";

type MovieType = {
  id: string;
  title: string;
  image: string;
  poster_path: string;
};

const HomeShows = () => {
  const URL_IMAGE = process.env.NEXT_PUBLIC_URL_IMAGE;

  const [shows, setShows] = useState([]);

  const fetchShows = async () => {
    const res = await discoverShows();
    setShows(res);
  };

  useEffect(() => {
    fetchShows();
  }, []);

  return (
    <Container className="pb-12 lg:pb-12">
      <Grid>
        <h2 className="col-span-full text-3xl">Shows</h2>
        {shows.slice(0, 6).map((show: MovieType) => {
          return (
            <div className="col-span-2" key={show.id}>
              <img
                className=""
                src={`${URL_IMAGE + show.poster_path}`}
                alt={show.title}
              />
              <h2 className="py-2">{show.title}</h2>
            </div>
          );
        })}
      </Grid>
    </Container>
  );
};

export default HomeShows;
