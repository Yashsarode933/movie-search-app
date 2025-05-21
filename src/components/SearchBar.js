import React from 'react';
import './SearchBar.css';

const SearchBar = ({ value, onChange }) => (
  <div className="search-bar">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search movies..."
      style={{
        width: '100%',
        padding: '8px 12px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        outline: 'none',
        backgroundColor: '#fff'
      }}
    />

  </div>
);

export default SearchBar;
