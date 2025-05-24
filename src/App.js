import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetail from './pages/MovieDetail';
import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Header from './components/Header';
import WatchlistPage from './pages/WatchlistPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchMovies = async (
    searchTerm = 'Avengers',
    pageNumber = 1,
    append = false,
    type = '',
    year = ''
  ) => {
    let url = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${searchTerm}&page=${pageNumber}`;
    if (type) url += `&type=${type}`;
    if (year) url += `&y=${year}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === 'True') {
        setMovies((prev) => (append ? [...prev, ...data.Search] : data.Search));
        setTotalResults(parseInt(data.totalResults));
      } else {
        setMovies([]);
        setTotalResults(0);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setMovies([]);
      setTotalResults(0);
    }
  };

  const handleSearchChange = (val) => {
    setQuery(val);
  };

  const handleFilterTypeChange = (e) => {
    const val = e.target.value;
    setFilterType(val);
    setPage(1);
    fetchMovies(query.length > 2 ? query : 'Avengers', 1, false, val, filterYear);
  };

  const handleFilterYearChange = (e) => {
    const val = e.target.value;
    setFilterYear(val);
    setPage(1);
    fetchMovies(query.length > 2 ? query : 'Avengers', 1, false, filterType, val);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(query.length > 2 ? query : 'Avengers', nextPage, true, filterType, filterYear);
  };

  // Initial movie fetch
  useEffect(() => {
    fetchMovies('Avengers', 1, false);
  }, []);

  useEffect(() => {
    if (query.length > 2) {
      fetchMovies(query, 1, false, filterType, filterYear);
    } else if (query.length === 0) {
      fetchMovies('Avengers', 1, false);
    }
  }, [query, filterType, filterYear]);

  return (
    <Router>
      <Header
        query={query}
        onSearchChange={handleSearchChange}
        filterType={filterType}
        onFilterTypeChange={handleFilterTypeChange}
        filterYear={filterYear}
        onFilterYearChange={handleFilterYearChange}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <MovieList movies={movies} />
              {movies.length === 0 && (
                <p style={{ color: 'white', textAlign: 'center', marginTop: '30px' }}>
                  No results found. Try a different title or adjust filters.
                </p>
              )}
              {movies.length > 0 && movies.length < totalResults && (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <button
                    onClick={handleLoadMore}
                    style={{
                      padding: '10px 20px',
                      fontSize: '16px',
                      cursor: 'pointer',
                      backgroundColor: '#333',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                    }}
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          }
        />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
