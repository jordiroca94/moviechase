export type MovieType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: "movie";
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type ShowType = {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  media_type: "tv";
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

export type PersonType = {
  adult: boolean;
  gender: number;
  id: number;
  known_for: MovieType[] | ShowType[];
  known_for_department: string;
  media_type: "person";
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
};

export type MovieDetailType = {
  belongs_to_collection: {
    backdrop_path: string;
    id: number;
    name: string;
    poster_path: string;
  };
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  imdb_id: string;
  origin_country: string[];
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  revenue: number;
  runtime: number;
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
} & Pick<
  MovieType,
  | "adult"
  | "backdrop_path"
  | "id"
  | "original_language"
  | "original_title"
  | "popularity"
  | "poster_path"
  | "release_date"
  | "title"
  | "video"
  | "vote_average"
  | "vote_count"
  | "overview"
>;

export type ShowDetailType = {
  created_by: {
    credit_id: string;
    gender: number;
    id: number;
    name: string;
    original_name: string;
    profile_path: string;
  }[];
  episode_run_time: number[];
  genres: { id: number; name: string }[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_episode_to_air: EpisodeType;
  networks: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  next_episode_to_air: EpisodeType;
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
  }[];
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  type: string;
} & Pick<
  ShowType,
  | "id"
  | "adult"
  | "backdrop_path"
  | "first_air_date"
  | "origin_country"
  | "original_language"
  | "original_name"
  | "overview"
  | "popularity"
  | "poster_path"
  | "vote_average"
  | "vote_count"
>;

type EpisodeType = {
  air_date: string;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
};

export type VideoType = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
};

export type ImageType = {
  backdrops: ImageAssetType[];
  id: number;
  logos: ImageAssetType[];
  posters: ImageAssetType[];
};

export type ImageAssetType = {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

export type CreditsType = {
  cast: CastType[];
  crew: CrewType[];
  id: number;
};

export type CastType = {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
};

export type CrewType = {
  credit_id: string;
  department: string;
  job: string;
} & Pick<
  CastType,
  | "adult"
  | "gender"
  | "id"
  | "known_for_department"
  | "name"
  | "original_name"
  | "popularity"
  | "profile_path"
>;
