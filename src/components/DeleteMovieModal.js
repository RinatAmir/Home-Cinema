import React, { useContext } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import MoviesContext from '../contex/movies/moviesContext';

const DeleteMovieModal = () => {
  const deleteCurrentMovie = () => {
    deleteMovie(currentMovie.imdbID);
    M.toast({ html: 'Movie Deleted' });
  };

  const moviesContext = useContext(MoviesContext);
  const { currentMovie, deleteMovie } = moviesContext;
  return (
    <div id='deleteModal' className='modal'>
      <div className='modal-content'>
        <h4>Delete Movie</h4>
        <p>Are you sure you wont to delete this movie?</p>
      </div>
      <div className='modal-footer'>
        <button
          onClick={deleteCurrentMovie}
          className='waves-effect waves-green btn-flat modal-close'
        >
          Yes
        </button>
        <button className='waves-effect waves-green btn-flat modal-close'>
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteMovieModal;
