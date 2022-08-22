export type MovieType = {
  id: number;
  title: string;
  year: string;
  duration: string;
  genres: string[];
  director: string;
  actors: string;
  plot: string;
  posterUrl: string;
};

export type MoviesType = {
  title: string;
  items: MovieType[];
};
