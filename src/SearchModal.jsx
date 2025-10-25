import React, { useState, useEffect } from 'react';
import mockData from '../db/db.json';

function SearchModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    if (searchTerm.trim()) {
      // Search in mock data - combine posts users and suggestions
      const postsUsers = mockData.posts.map(p => p.user);
      const allUsers = [...mockData.suggestions, ...postsUsers];
      
      // Remove duplicates based on username
      const uniqueUsers = allUsers.filter((user, index, self) =>
        index === self.findIndex((u) => u.username === user.username)
      );
      
      // Filter based on search term
      const userResults = uniqueUsers.filter(s => 
        s.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.fullName && s.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setSearchResults(userResults);
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
