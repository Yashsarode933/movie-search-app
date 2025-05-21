import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Watchlist.css'; // ← Import CSS

const WatchlistPage = () => {
  const currentUser = localStorage.getItem('currentUser');
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === currentUser);
      setWatchlist(user?.watchlist || []);
    }
  }, [currentUser]);

  const handleRemove = (imdbID) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(user => {
      if (user.email === currentUser) {
        return {
          ...user,
          watchlist: user.watchlist.filter(movie => movie.imdbID !== imdbID),
        };
      }
      return user;
    });

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setWatchlist(watchlist.filter(movie => movie.imdbID !== imdbID));
    toast.success('Movie removed from your watchlist!');
  };

  if (!currentUser) {
    return (
      <div className="watchlist-container">
        <h2 className="watchlist-title">Please log in to view your watchlist.</h2>
        <Link to="/auth" className="movie-link">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="watchlist-container">
      <h2 className="watchlist-title">⭐ Your Watchlist</h2>

      {watchlist.length === 0 ? (
        <p className="watchlist-empty">Your watchlist is empty.</p>
      ) : (
        <div className="watchlist-grid">
          {watchlist.map(movie => (
            <div key={movie.imdbID} className="movie-card">
              <Link to={`/movie/${movie.imdbID}`} className="movie-link">
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}
                  alt={movie.Title}
                />
                <div className="movie-info">
                  <h3 className="movie-title">{movie.Title}</h3>
                  <p className="movie-year">{movie.Year}</p>
                </div>
              </Link>
              <button
                onClick={() => handleRemove(movie.imdbID)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;
