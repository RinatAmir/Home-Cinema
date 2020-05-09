import React, { useEffect, useContext } from "react";
import MoviesContext from "../contex/movies/moviesContext";
import MovieItem from "./MovieItem";

const Movies = () => {
  const moviesContext = useContext(MoviesContext);
  const { getMovies, movies } = moviesContext;

  useEffect(() => {
    getMovies();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="row">
        {movies.map((movie) => (
          <MovieItem key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
