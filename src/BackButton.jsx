import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <button className='back-button' onClick={handleBack} title="Go back">
      <i className="bi bi-arrow-left"></i>
    </button>
  );
}

export default BackButton;
