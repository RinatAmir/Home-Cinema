import React, { useEffect } from "react";
import "./App.css";
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";
import Movies from "./components/Movies";
import MovieDetailsModal from "./components/MovieDetailsModal";

import MoviesState from "./contex/movies/MoviesState";
import DeleteMovieModal from "./components/DeleteMovieModal";

const App = () => {
  useEffect(() => {
    //Init Materialize JS
    M.AutoInit();
  }, []);

  return (
    <MoviesState>
      <div className="App container">
        <Movies />
        <MovieDetailsModal />
        <DeleteMovieModal />
      </div>
    </MoviesState>
  );
};

export default App;
