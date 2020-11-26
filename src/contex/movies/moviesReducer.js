import {
  GET_MOVIES,
  SET_CURRENT_MOVIE,
  UPDATED_DETAILS,
  DELETE_MOVIE,
} from './types';

export default (state, action) => {
  switch (action.type) {
    case GET_MOVIES:
      // state is immutable object, therefore we cannot reassign it, we use the spread operator to add new values.
      return {
        ...state,
        movies: action.payload,
      };
    case SET_CURRENT_MOVIE:
      return {
        ...state,
        currentMovie: action.payload,
      };
    case UPDATED_DETAILS:
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie.imdbID === action.payload.imdbID ? action.payload : movie
        ),
      };
    case DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter((movie) => {
          return movie.imdbID !== action.payload;
        }),
      };
    default:
      return state;
  }
};
