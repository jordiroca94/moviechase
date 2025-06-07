"use client";

import { recommendMutation } from "@/mutations/mutations";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { TbStarFilled } from "react-icons/tb";

const Recommendation = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  console.log(results, "response recommended");
  const handleRecommend = async () => {
    setLoading(true);
    try {
      const res = await recommendMutation(searchQuery);
      if (res.ok) {
        setLoading(false);
        setResults(await res.json());
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto text-white bg-black p-4 pt-32 flex flex-col items-center">
      <div className=" mb-8 text-center">
        <h1 className="text-4xl font-bold text-secondary mb-2">
          Get AI Recommended
        </h1>
        <p className="text-secondary/80">
          Think about a movie or TV show you like and discover similar titles
        </p>
      </div>

      <div className="relative mb-8 w-96">
        <div className="relative">
          <IoSearchSharp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleRecommend();
              }
            }}
            placeholder="Enter a movie or TV show"
            className="w-full text-black pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-lg"
          />
        </div>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
          <p className="mt-2 text-secondary">Finding recommendations...</p>
        </div>
      )}

      {results.length > 0 && !loading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((rec, index) => (
            <RecommendationCard key={index} recommendation={rec} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Recommendation;

function RecommendationCard({ recommendation }: { recommendation: any }) {
  return (
    <a
      href={`/${recommendation.type}s/${recommendation.tmdb_id}`}
      className="w-full rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1  hover:bg-gray-800 cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-secondary mb-1">
            {recommendation.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span>{recommendation.year}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-semibold text-secondary">
            {recommendation.rating}
          </span>
          <TbStarFilled className="text-secondary size-4" />
        </div>
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {recommendation.genre.map((genre: string) => (
            <span
              key={recommendation.tmdb_id}
              className="bg-white text-black px-2 py-1 rounded-full text-xs font-medium"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
      <div>
        <p className="text-gray-400 text-sm leading-relaxed">
          {recommendation.plot}
        </p>
      </div>
    </a>
  );
}
