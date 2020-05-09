import React, { Fragment, useContext, useState, useEffect } from "react";
import MoviesContext from "../contex/movies/moviesContext";

const MovieItem = ({ movie }) => {
  const moviesContext = useContext(MoviesContext);
  const { setCurrentMovie } = moviesContext;

  const [mouseEnter, setMouseEnter] = useState(false);

  return (
    <Fragment>
      <div className="col s12 m4 ">
        <div className="card">
          <div className="card-image">
            <img src={movie.Poster} style={{ height: "450px" }}></img>
            <a
              href="#movieDetailsModal"
              onClick={() => setCurrentMovie(movie)}
              className="btn-floating halfway-fab waves-effect waves-light red modal-trigger edit-movie-btn"
            >
              <i className="material-icons">create</i>
            </a>
          </div>
          <div
            className="card-content"
            style={{ height: "80px", marginBottom: "20px" }}
          >
            <p style={{ textTransform: "capitalize" }}>
              {movie.Title}, {movie.Year}
            </p>
          </div>
          <a
            className=" btn-small blue-grey lighen-4 modal-trigger"
            style={{ marginBottom: "10px" }}
            href="#deleteModal"
            onClick={() => setCurrentMovie(movie)}
            onMouseEnter={() => setMouseEnter(true)}
            onMouseLeave={() => setMouseEnter(false)}
          >
            {mouseEnter ? <i className="material-icons">delete</i> : "Delete"}
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export default MovieItem;
