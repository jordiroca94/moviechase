import { VideoType } from "@/types/common";

type Props = {
  videos: VideoType[];
  backupImage: string;
  imageAlt: string;
};

const Trailer = ({ videos, backupImage, imageAlt }: Props) => {
  const URL_IMAGE = process.env.NEXT_PUBLIC_URL_IMAGE;

  const trailer = videos.filter(
    (video) =>
      (video.type === "Trailer" || video.type === "Teaser") &&
      (video.name.includes("Trailer") || video.name.includes("Teaser"))
  );
  return (
    <div className="col-span-8 sm:col-span-6 lg:col-span-7 aspect-video sm:aspect-auto">
      {videos.length > 0 && trailer[0] ? (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${trailer[0].key}`}
          title={trailer[0].name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <img
          className="w-full h-full object-cover"
          src={`${URL_IMAGE + backupImage}`}
          alt={imageAlt}
        />
      )}
    </div>
  );
};

export default Trailer;
