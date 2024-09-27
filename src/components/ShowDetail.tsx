"use client";
import { getShow } from "@/queries/queries";
import { useEffect, useState } from "react";
import Container from "./ui/Container";
import { ShowDetailType } from "@/types/common";

const ShowDetail = ({ id }: { id: number }) => {
  const [show, setShow] = useState<ShowDetailType>();

  const fetchShows = async () => {
    const res = await getShow(id);
    setShow(res);
  };

  useEffect(() => {
    fetchShows();
  }, []);

  console.log(show, "show");

  return <Container>{id}</Container>;
};

export default ShowDetail;
