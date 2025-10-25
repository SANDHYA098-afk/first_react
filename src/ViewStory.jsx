import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import BackButton from './BackButton.jsx'
import mockData from '../db/db.json'


function ViewStory() {

const {id, tot} = useParams();

const [story, setStory] = useState(null);
const [progress, setProgress] = useState(0);
const [isPaused, setIsPaused] = useState(false);

const navigate = useNavigate();

const STORY_DURATION = 5000; // 5 seconds

useEffect(() => {
  // Find story from mockData
  const foundStory = mockData.stories.find(s => s.id === id);
  setStory(foundStory || null);
}, [id]);

// Progress bar animation
useEffect(() => {
  if (!story || isPaused) return;

  setProgress(0);
  const interval = setInterval(() => {
    setProgress(prev => {
      if (prev >= 100) {
        clearInterval(interval);
        handleNext();
        return 100;
      }
      return prev + (100 / (STORY_DURATION / 50));
    });
  }, 50);

  return () => clearInterval(interval);
}, [story, isPaused, id]);

if (id > tot || id < 1){
  navigate('/');
}

const handlePrevious = () => {
  if (Number(id) > 1) {
    navigate(`/story/${Number(id) - 1}/${tot}`);
  } else {
    navigate('/');
  }
};

const handleNext = () => {
  if (Number(id) < tot) {
    navigate(`/story/${Number(id) + 1}/${tot}`);
  } else {
    navigate('/');
  }
};

const handleClose = () => {
  navigate('/');
};

  return (
    <div className='story-viewer' onMouseDown={() => setIsPaused(true)} onMouseUp={() => setIsPaused(false)}>
      <BackButton />
      {story ? (
        <>
          {/* Progress bars */}
          <div className='story-progress-container'>
            {[...Array(Number(tot))].map((_, index) => (
              <div key={index} className='story-progress-bar-wrapper'>
                <div 
                  className='story-progress-bar'
                  style={{
                    width: index < Number(id) - 1 ? '100%' : 
                           index === Number(id) - 1 ? `${progress}%` : '0%'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header */}
          <div className='story-header'>
            <div className='d-flex align-items-center gap-2'>
              <img src={story.user.avatar} alt={story.user.username} className='story-header-avatar rounded-circle' />
              <span className='story-username'>{story.user.username}</span>
              <span className='story-time'>5h</span>
            </div>
            <button className='story-close-btn' onClick={handleClose}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          {/* Story Content */}
          <div className='story-content'>
            <img src={story.image} alt="story" className='story-image' />
            
            {/* Navigation Areas */}
            <div className='story-nav-left' onClick={handlePrevious}></div>
            <div className='story-nav-right' onClick={handleNext}></div>
          </div>

          {/* Navigation Arrows */}
          {Number(id) > 1 && (
            <button className='story-arrow story-arrow-left' onClick={handlePrevious}>
              <i className="bi bi-chevron-left"></i>
            </button>
          )}
          {Number(id) < tot && (
            <button className='story-arrow story-arrow-right' onClick={handleNext}>
              <i className="bi bi-chevron-right"></i>
            </button>
          )}

          {/* Story Actions */}
          <div className='story-actions'>
            <input 
              type="text" 
              placeholder={`Reply to ${story.user.username}...`}
              className='story-reply-input'
            />
            <i className="bi bi-heart story-action-icon"></i>
            <i className="bi bi-send story-action-icon"></i>
          </div>
        </>
      ) : (
        <div className='story-loading'>Loading...</div>
      )}
    </div>
  )
}

export default ViewStory  