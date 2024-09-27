"use client";
import { getShow } from "@/queries/queries";
import { useEffect, useState } from "react";
import Container from "./ui/Container";

const ShowDetail = ({ id }: { id: number }) => {
  const [show, setShow] = useState<any>();
  console.log(id);

  const fetchShows = async () => {
    const res = await getShow(id);
    setShow(res);
  };

  useEffect(() => {
    fetchShows();
  }, []);

  return <Container>{id}</Container>;
};

export default ShowDetail;
