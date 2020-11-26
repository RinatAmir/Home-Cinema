import React, { Fragment, useState, useContext, useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import MoviesContext from '../contex/movies/moviesContext';

const MovieDetailsModal = () => {
  const moviesContext = useContext(MoviesContext);
  const { currentMovie, updatedMovie, movies } = moviesContext;

  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [type, setType] = useState('');
  const [poster, setPoster] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [formErrors, setFormErrors] = useState([]);

  useEffect(() => {
    if (currentMovie) {
      setTitle(currentMovie.Title);
      setYear(currentMovie.Year);
      setType(currentMovie.Type);
      setPoster(currentMovie.Poster);
    }
  }, [currentMovie]);

  useEffect(() => {
    let errors = formValid();
    if (errors.length === 0) {
      setIsFormValid(true);
    } else {
      setFormErrors(errors);
      setIsFormValid(false);
    }
  }, [title, year, type]);

  const formValid = () => {
    let errors = [];
    // all fields are filled
    if (!title || !year || !type) {
      errors.push('Please fill out all fields.');
    }

    // valid year between 1900 and current year
    let date = new Date();
    let currentYear = date.getFullYear();
    if (year < 1900 || year > currentYear) {
      errors.push('Please enter a valid year.');
    }

    // validate unique title
    movies.map((movie) =>
      movie.imdbID !== currentMovie.imdbID && movie.Title === title
        ? errors.push('Title already exists.')
        : null
    );

    return errors;
  };

  const onSubmit = (e) => {
    const updatedMovieDetails = { ...currentMovie };
    updatedMovieDetails.Title = filterNonAlphaNumericLetters(title);
    updatedMovieDetails.Year = year;
    updatedMovieDetails.Type = type;
    e.preventDefault();

    if (isFormValid) {
      updatedMovie(updatedMovieDetails);
    } else {
      formErrors.forEach((error) => {
        M.toast({
          html: error,
          displayLength: 3000,
        });
      });
    }
  };

  const filterNonAlphaNumericLetters = (string) => {
    return string.replace(/[^a-zA-Z0-9,\s]+/g, '');
  };

  return (
    <Fragment>
      <div
        id='movieDetailsModal'
        className='modal'
        style={{ maxHeight: 'max-content' }}
      >
        <button
          className='modal-close'
          style={{ float: 'right', margin: '5px' }}
        >
          <i className='material-icons' style={{ marginLeft: '0%' }}>
            close
          </i>
        </button>

        <form onSubmit={onSubmit}>
          <div className='modal-content row'>
            <div className='col m4'>
              <img
                className='materialboxed'
                src={poster}
                alt='img'
                width='200px'
              ></img>
            </div>

            <div className='col m8'>
              <label>
                Movie Title:
                <input
                  type='text'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </label>
              <label>
                Movie Year:
                <input
                  type='number'
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                ></input>
              </label>
              <label>
                Movie Type:
                <input
                  type='text'
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                ></input>
              </label>
            </div>
          </div>
          <div className='modal-footer' style={{ textAlign: 'center' }}>
            <button
              className={
                'btn waves-effect waves-light ' +
                (!isFormValid ? '' : 'modal-close')
              }
              type='submit'
            >
              Submit
              <i className='material-icons left'>done</i>
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default MovieDetailsModal;
