import { ImageType } from "@/types/common";
import { imagesSettings } from "@/utils/slider";
import Slider from "react-slick";

type Props = {
  id: "movie-images" | "show-images";
  images: ImageType;
  alt: string;
};

const Images = ({ id, images, alt }: Props) => {
  const URL_IMAGE = process.env.NEXT_PUBLIC_URL_IMAGE;

  return (
    <>
      {images.backdrops.length > 3 && (
        <>
          <h2 id={id} className="text-2xl col-span-full py-10">
            Images
          </h2>
          <Slider {...imagesSettings}>
            {images.backdrops.map((image) => {
              return (
                <img
                  key={image.file_path}
                  src={`${URL_IMAGE + image.file_path}`}
                  alt={alt}
                />
              );
            })}
          </Slider>
        </>
      )}
    </>
  );
};

export default Images;
