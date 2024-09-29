"use client";
import { useEffect, useState } from "react";
import Container from "./ui/Container";
import { getPersonImages } from "@/queries/queries";
import { PersonImagesType } from "@/types/common";
import Grid from "./ui/Grid";
import PersonInformation from "./PersonInformation";
import Slider from "react-slick";
import { imagesSettings } from "@/utils/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "./ui/Loader";
import Filmography from "./Filmography";

const PersonDetail = ({ id }: { id: number }) => {
  const URL_IMAGE = process.env.NEXT_PUBLIC_URL_IMAGE;

  const [images, setImages] = useState<PersonImagesType>();

  const fetchPersonImages = async () => {
    const res = await getPersonImages(id);
    setImages(res);
  };

  useEffect(() => {
    fetchPersonImages();
  }, []);

  if (images) {
    return (
      <Container>
        <PersonInformation id={id} />
        <Filmography id={id} />
        <Grid>
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
  } else {
    return <Loader className="h-screen" big />;
  }
};

export default PersonDetail;
