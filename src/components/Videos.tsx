"use client";
import { VideoType } from "@/types/common";
import { useState } from "react";

const Videos = ({
  videos,
  id,
}: {
  videos: VideoType[];
  id: "movie-videos" | "show-videos";
}) => {
  const [moreVideos, setMoreVideos] = useState(2);

  return (
    <>
      {videos.length > 0 && (
        <>
          <h2 id={id} className="text-2xl col-span-full py-10">
            Videos
          </h2>
          <div className="col-span-full grid grid-cols-12 gap-4 lg:gap-10">
            {videos.slice(0, moreVideos).map((video) => (
              <div
                key={video.id}
                className="col-span-12 sm:col-span-6 aspect-video"
              >
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title={video.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
            {moreVideos < videos.length && (
              <div className="col-span-full flex justify-center">
                <button
                  onClick={() => setMoreVideos(moreVideos + 2)}
                  className="hover:underline hover:text-secondary"
                >
                  See More
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Videos;
