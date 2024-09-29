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

export const getPlayingMovies = async () => {
  const {
    data: { results },
  } = await axios.get(`${API_URL}/movie/now_playing`, {
    params: {
      api_key: API_KEY,
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

export const getTopRatedShows = async () => {
  const {
    data: { results },
  } = await axios.get(`${API_URL}/tv/top_rated`, {
    params: {
      api_key: API_KEY,
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
