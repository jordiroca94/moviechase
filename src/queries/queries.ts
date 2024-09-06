import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const URL_IMAGE = process.env.NEXT_PUBLIC_URL_IMAGE;

export const discoverMovies = async () => {
  const {
    data: { results },
  } = await axios.get(`${API_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
    },
  });
  return results;
};

export const discoverShows = async () => {
  const {
    data: { results },
  } = await axios.get(`${API_URL}/discover/tv`, {
    params: {
      api_key: API_KEY,
    },
  });
  return results;
};
