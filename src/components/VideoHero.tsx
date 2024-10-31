"use client";

import { useState } from "react";

const VideoHero = () => {
  const [controls, setControls] = useState(false);

  return (
    <div className="h-[90vh] relative mt-header">
      <div
        onClick={() => setControls(true)}
        className={`h-full w-full inset-0 ${controls ? "hidden" : "absolute"}`}
      />
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/fiqqAI0e4Nc?si=b_Le1MizZFTqGQL-controls=0&autoplay=1&mute=1"
        title="Joker 2"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};
export default VideoHero;
