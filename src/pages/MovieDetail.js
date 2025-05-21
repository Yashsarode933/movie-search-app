import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './MovieDetail.css';
import { toast } from 'react-toastify';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const currentUser = localStorage.getItem('currentUser');

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${id}&plot=full`);
      const data = await res.json();
      setMovie(data);

      // Check if movie is already in user's watchlist
      if (currentUser) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === currentUser);
        const alreadyAdded = user?.watchlist?.some(w => w.imdbID === id);
        setIsInWatchlist(alreadyAdded);
      }
    };
    fetchMovie();
  }, [id, currentUser]);

  const handleAddToWatchlist = () => {
    if (!currentUser) {
      toast.info('Please login to add to watchlist.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(user => {
      if (user.email === currentUser) {
        const userWatchlist = user.watchlist || [];
        // Check if movie already exists in watchlist
        const alreadyAdded = userWatchlist.some(m => m.imdbID === movie.imdbID);
        if (alreadyAdded) {
          toast.info('Movie already in your watchlist!');
          return user; // no changes
        }
        return {
          ...user,
          watchlist: [...userWatchlist, movie],
        };
      }
      return user;
    });

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setIsInWatchlist(true);
    toast.success('Movie added to your watchlist!');
  };


  if (!movie) return <p style={{ textAlign: 'center' }}>Loading...</p>;

  return (
    <div className="movie-detail">
      <Link to="/" className='back-link'>⬅ Back to Search</Link>
      <div className="movie-detail-content">
        <img
          className="movie-poster"
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
          alt={movie.Title}
        />
        <div className="movie-info">
          <h2>{movie.Title}</h2>
          <p><strong>IMDB Rating:</strong> ⭐ {movie.imdbRating}</p>
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Rated:</strong> {movie.Rated}</p>
          <p><strong>Released:</strong> {movie.Released}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>

          {currentUser && (
            isInWatchlist ? (
              <p style={{ color: 'green', marginTop: '10px' }}>✅ Already in Watchlist</p>
            ) : (
              <button
                onClick={handleAddToWatchlist}
                style={{ marginTop: '15px', padding: '10px 20px', cursor: 'pointer' }}
              >
                ⭐ Add to Watchlist
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
