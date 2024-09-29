import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// MOVIES
const randomPage = Math.floor(Math.random() * 5) + 1;

export const getMovies = async (id: number) => {
  const {
    data: { results },
  } = await axios.get(`${API_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      with_genres: id,
      page: randomPage,
    },
  });
  return results;
};

export const getPopularMovies = async () => {
  const {
    data: { results },
  } = await axios.get(`${API_URL}/movie/popular`, {
    params: {
      api_key: API_KEY,
      page: randomPage,
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
      page: randomPage,
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
      page: randomPage,
    },
  });
  return results;
};

export const getPlayingMovies = async () => {
  const {
    data: { results },
  } = await axios.get(`${API_URL}/movie/now_playing`, {
    params: {
      api_key: API_KEY,
      page: randomPage,
    },
  });
  return results;
};

export const getMovie = async (id: number) => {
  const { data } = await axios.get(`${API_URL}/movie/${id}`, {
    params: {
      api_key: API_KEY,
    },
  });
  return data;
};

export const getMovieVideos = async (id: number) => {
  const { data } = await axios.get(`${API_URL}/movie/${id}/videos`, {
    params: {
      api_key: API_KEY,
    },
  });
  return data.results;
};

export const getMovieImages = async (id: number) => {
  const { data } = await axios.get(`${API_URL}/movie/${id}/images`, {
    params: {
      api_key: API_KEY,
    },
  });
  return data;
};

export const getMovieCredits = async (id: number) => {
  const { data } = await axios.get(`${API_URL}/movie/${id}/credits`, {
    params: {
      api_key: API_KEY,
    },
  });
  return data;
};

export const getMovieGenre = async () => {
  const {
    data: { genres },
  } = await axios.get(`${API_URL}/genre/movie/list`, {
    params: {
      api_key: API_KEY,
    },
  });
  return genres;
};

// SHOWS

export const getShows = async (id: number) => {
  const {
    data: { results },
  } = await axios.get(`${API_URL}/discover/tv`, {
    params: {
      api_key: API_KEY,
      with_genres: id,
      page: randomPage,
    },
  });
  return results;
};

export const getPopularShows = async () => {
  const {
    data: { results },
  } = await axios.get(`${API_URL}/tv/popular`, {
    params: {
      api_key: API_KEY,
      page: randomPage,
    },
  });
  return results;
};

export const getTopRatedShows = async () => {
  const {
    data: { results },
  } = await axios.get(`${API_URL}/tv/top_rated`, {
    params: {
      api_key: API_KEY,
      page: randomPage,
    },
  });
  return results;
};

export const getAiringTodayShows = async () => {
  const {
    data: { results },
  } = await axios.get(`${API_URL}/tv/airing_today`, {
    params: {
      api_key: API_KEY,
      page: randomPage,
    },
  });
  return results;
};

export const getAiringShows = async () => {
  const {
    data: { results },
  } = await axios.get(`${API_URL}/tv/on_the_air`, {
    params: {
      api_key: API_KEY,
      page: randomPage,
    },
  });
  return results;
};

export const getShow = async (id: number) => {
  const { data } = await axios.get(`${API_URL}/tv/${id}`, {
    params: {
      api_key: API_KEY,
    },
  });
  return data;
};

export const getShowVideos = async (id: number) => {
  const { data } = await axios.get(`${API_URL}/tv/${id}/videos`, {
    params: {
      api_key: API_KEY,
    },
  });
  return data.results;
};

export const getShowImages = async (id: number) => {
  const { data } = await axios.get(`${API_URL}/tv/${id}/images`, {
    params: {
      api_key: API_KEY,
    },
  });
  return data;
};

export const getShowCredits = async (id: number) => {
  const { data } = await axios.get(`${API_URL}/tv/${id}/credits`, {
    params: {
      api_key: API_KEY,
    },
  });
  return data;
};

export const getShowGenre = async () => {
  const {
    data: { genres },
  } = await axios.get(`${API_URL}/genre/tv/list`, {
    params: {
      api_key: API_KEY,
    },
  });
  return genres;
};

// SEARCH
export const getSearch = async (query: string) => {
  const {
    data: { results },
  } = await axios.get(`${API_URL}/search/multi?query=${query}`, {
    params: {
      api_key: API_KEY,
    },
  });
  return results;
};

// PEOPLE

export const getPerson = async (id: number) => {
  const { data } = await axios.get(`${API_URL}/person/${id}`, {
    params: {
      api_key: API_KEY,
    },
  });
  return data;
};

export const getPersonImages = async (id: number) => {
  const { data } = await axios.get(`${API_URL}/person/${id}/images`, {
    params: {
      api_key: API_KEY,
    },
  });
  return data;
};

export const getPersonCredits = async (id: number) => {
  const { data } = await axios.get(`${API_URL}/person/${id}/movie_credits`, {
    params: {
      api_key: API_KEY,
    },
  });
  return data;
};

export const getPersonTVCredits = async (id: number) => {
  const { data } = await axios.get(`${API_URL}/person/${id}/tv_credits`, {
    params: {
      api_key: API_KEY,
    },
  });
  return data;
};
