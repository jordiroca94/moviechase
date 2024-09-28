"use client";
import { useEffect, useState } from "react";
import Container from "./ui/Container";
import { getPersonCredits, getPersonImages } from "@/queries/queries";
import { ImageType, PersonCastType, PersonCreditsType } from "@/types/common";
import Grid from "./ui/Grid";
import PersonInformation from "./PersonInformation";

const PersonDetail = ({ id }: { id: number }) => {
  const [images, setImages] = useState<ImageType>();
  const [credits, setCredits] = useState<PersonCreditsType>();

  const fetchPersonImages = async () => {
    const res = await getPersonImages(id);
    setImages(res);
  };

  const fetchPersonCredits = async () => {
    const res = await getPersonCredits(id);
    setCredits(res);
  };

  useEffect(() => {
    fetchPersonImages();
    fetchPersonCredits();
  }, []);

  if (images && credits) {
    const filmography = credits?.cast.sort(
      (a: PersonCastType, b: PersonCastType) =>
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
    );
    return (
      <Container>
        <PersonInformation id={id} />
        <Grid>
          <div className="col-span-full">
            {filmography.map((item) => (
              <div key={item.id} className="flex gap-4">
                <p>{item.title}</p>
                <p>{item.release_date}</p>
              </div>
            ))}
          </div>
        </Grid>
      </Container>
    );
  }
};

export default PersonDetail;
