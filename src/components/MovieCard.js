import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${movie.imdbID}`)}>
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image"}
        alt={movie.Title}
      />
      <div className="movie-card-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
