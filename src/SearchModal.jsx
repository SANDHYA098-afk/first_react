import React, { useState, useEffect } from 'react';

function SearchModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    if (searchTerm.trim()) {
      // Search in posts and suggestions
      Promise.all([
        fetch('http://localhost:3001/posts').then(res => res.json()),
        fetch('http://localhost:3001/suggestions').then(res => res.json())
      ])
        .then(([posts, suggestions]) => {
          const userResults = suggestions.filter(s => 
            s.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.fullName.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setSearchResults(userResults);
        })
        .catch(err => console.log(err));
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleClearRecent = () => {
    setRecentSearches([]);
  };

  if (!isOpen) return null;

  return (
    <div className='search-modal'>
      <div className='search-modal-header'>
        <h3>Search</h3>
        <button className='search-close-btn' onClick={onClose}>
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      <div className='search-input-wrapper'>
        <i className="bi bi-search search-icon"></i>
        <input
          type="text"
          placeholder="Search"
          className='search-input'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
        {searchTerm && (
          <button className='search-clear-btn' onClick={() => setSearchTerm('')}>
            <i className="bi bi-x-circle-fill"></i>
          </button>
        )}
      </div>

      <div className='search-results'>
        {searchTerm ? (
          searchResults.length > 0 ? (
            <>
              <div className='search-section-title'>Users</div>
              {searchResults.map(user => (
                <div key={user.id} className='search-result-item'>
                  <img src={user.avatar} alt={user.username} className='search-avatar rounded-circle' />
                  <div className='search-user-info'>
                    <div className='search-username'>{user.username}</div>
                    <div className='search-fullname'>{user.fullName}</div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className='search-no-results'>No results found.</div>
          )
        ) : (
          <div>
            <div className='search-recent-header'>
              <span className='search-section-title'>Recent</span>
              {recentSearches.length > 0 && (
                <button className='search-clear-all' onClick={handleClearRecent}>
                  Clear all
                </button>
              )}
            </div>
            {recentSearches.length > 0 ? (
              recentSearches.map((search, index) => (
                <div key={index} className='search-recent-item'>
                  <i className="bi bi-clock-history"></i>
                  <span>{search}</span>
                  <button className='search-remove-btn'>
                    <i className="bi bi-x"></i>
                  </button>
                </div>
              ))
            ) : (
              <div className='search-no-recent'>No recent searches.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchModal;
