import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header = ({
  query,
  onSearchChange,
  filterType,
  onFilterTypeChange,
  filterYear,
  onFilterYearChange,
}) => {
  const currentUser = localStorage.getItem('currentUser');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  // Hide search & filters on watchlist page
  const hideSearchAndFilters = location.pathname === '/watchlist';

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        backgroundColor: '#1a1a1a',
        color: '#fff',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 4px #f5c518',
        flexWrap: 'wrap',
        gap: '10px',
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#f5c518',
          textDecoration: 'none',
          letterSpacing: '1px',
        }}
      >
        ScreenHawk
      </Link>

      {/* Search Bar + Filters */}
      {!hideSearchAndFilters && (
        <div
            style={{
            flexGrow: 1,
            maxWidth: '600px',
            margin: '0 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            }}
        >
            <SearchBar value={query} onChange={onSearchChange} />

            {/* Type Filter */}
            <select
              value={filterType}
              onChange={onFilterTypeChange}
              style={{
                padding: '8px 12px',
                borderRadius: '4px',
                border: 'none',
                fontSize: '16px',
                backgroundColor: '#333',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              <option value="">All Types</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>

            {/* Year Filter */}
            <select
                value={filterYear}
                onChange={onFilterYearChange}
                style={{
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: 'none',
                    fontSize: '16px',
                    backgroundColor: '#333',
                    color: '#fff',
                    cursor: 'pointer',
                }}
                >
                <option value="">All Years</option>
                {[...Array(20)].map((_, idx) => {
                    const year = new Date().getFullYear() - idx;
                    return (
                    <option key={year} value={year}>
                        {year}
                    </option>
                    );
                })}
            </select>
        </div>
      )}

      {/* Navigation Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {currentUser ? (
          <>
            <Link
              to="/watchlist"
              style={{
                color: '#f5c518',
                textDecoration: 'none',
                fontWeight: '500',
              }}
            >
              ⭐ Watchlist
            </Link>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#f5c518',
                color: '#000',
                border: 'none',
                padding: '6px 12px',
                fontWeight: 'bold',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                color: '#f5c518',
                textDecoration: 'none',
                fontWeight: '500',
              }}
            >
              Login
            </Link>
            <Link
              to="/signup"
              style={{
                color: '#f5c518',
                textDecoration: 'none',
                fontWeight: '500',
              }}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
