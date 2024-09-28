"use client";
import { useEffect, useState } from "react";
import Container from "./ui/Container";
import { getPersonCredits, getPersonImages } from "@/queries/queries";
import {
  PersonCastType,
  PersonCreditsType,
  PersonImagesType,
} from "@/types/common";
import Grid from "./ui/Grid";
import PersonInformation from "./PersonInformation";
import Slider from "react-slick";
import { imagesSettings } from "@/utils/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PersonDetail = ({ id }: { id: number }) => {
  const URL_IMAGE = process.env.NEXT_PUBLIC_URL_IMAGE;

  const [images, setImages] = useState<PersonImagesType>();
  console.log(images, "Images-->");
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
          {images.profiles.length > 3 && (
            <div className="col-span-full">
              <h2 className="text-2xl col-span-full py-10">Images</h2>
              <Slider {...imagesSettings}>
                {images.profiles.map((image, index) => {
                  return (
                    <img
                      key={image.file_path}
                      src={`${URL_IMAGE + image.file_path}`}
                      alt={`Image-${index}`}
                    />
                  );
                })}
              </Slider>
            </div>
          )}
        </Grid>
      </Container>
    );
  }
};

export default PersonDetail;
