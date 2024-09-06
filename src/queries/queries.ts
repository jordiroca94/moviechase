import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// MOVIES

export const getPopularMovies = async () => {
  const {
    data: { results },
  } = await axios.get(`${API_URL}/movie/popular`, {
    params: {
      api_key: API_KEY,
    },
  });
  return results;
};

export const getTopRatedMovies = async () => {
  const {
    data: { results },
  } = await axios.get(`${API_URL}/movie/top_rated`, {
    params: {
      api_key: API_KEY,
    },
  });
  return results;
};

export const getUpcomingMovies = async () => {
  const {
    data: { results },
  } = await axios.get(`${API_URL}/movie/upcoming`, {
    params: {
      api_key: API_KEY,
    },
  });
  return results;
};

// SHOWS

export const getPopularShows = async () => {
  const {
    data: { results },
  } = await axios.get(`${API_URL}/tv/popular`, {
    params: {
      api_key: API_KEY,
    },
  });
  return results;
};
