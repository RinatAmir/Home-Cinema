import React, { useReducer } from "react";
import MoviesContext from "./moviesContext";
import MoviesReducer from "./moviesReducer";
import axios from "axios";

import {
  GET_MOVIES,
  SET_CURRENT_MOVIE,
  UPDATED_DETAILS,
  DELETE_MOVIE,
} from "./types";

const MoviesState = (props) => {
  const initialState = {
    loading: false,
    movies: [],
    newDetailsMovie: [],
  };

  const [state, dispatch] = useReducer(MoviesReducer, initialState);

  const getMovies = async () => {
    try {
      const response = await axios.get(
        "http://www.omdbapi.com/?s=love&apikey=5dbdc964"
      );
      removeNonAlphaNumericLetters(response.data.Search);
      dispatch({ type: GET_MOVIES, payload: response.data.Search });
    } catch (error) {
      console.error(error);
    }
  };

  const removeNonAlphaNumericLetters = (moviesArray) => {
    moviesArray.forEach((movie) => {
      movie.Title = movie.Title.replace(/[^a-zA-Z0-9\,\s]+/g, "");
    });
  };

  const setCurrentMovie = (movie) => {
    dispatch({ type: SET_CURRENT_MOVIE, payload: movie });
  };

  const updatedMovie = (newDetailsMovie) => {
    console.log("newDetailsMovie", newDetailsMovie);
    dispatch({ type: UPDATED_DETAILS, payload: newDetailsMovie });
  };

  const deleteMovie = (id) => {
    dispatch({ type: DELETE_MOVIE, payload: id });
  };

  return (
    <MoviesContext.Provider
      value={{
        movies: state.movies,
        currentMovie: state.currentMovie,
        getMovies,
        setCurrentMovie,
        updatedMovie,
        deleteMovie,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesState;
