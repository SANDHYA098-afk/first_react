import React, { useState } from 'react';
import axios from 'axios';

function CreatePostModal({ isOpen, onClose }) {
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [location, setLocation] = useState('');
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    if (url) {
      setPreview(url);
    }
  };

  const handleSubmit = async () => {
    if (!imageUrl || !caption) {
      alert('Please add an image and caption!');
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      user: {
        id: 1,
        username: "sandy_0123",
        fullName: "Your Name",
        avatar: "https://i.pravatar.cc/150?img=2",
        isVerified: false
      },
      image: imageUrl,
      caption: caption,
      likes: 0,
      isLiked: false,
      isSaved: false,
      comments: [],
      timestamp: "Just now",
      location: location || ""
    };

    try {
      await axios.post('http://localhost:3001/posts', newPost);
      alert('Post created successfully!');
      setCaption('');
      setImageUrl('');
      setLocation('');
      setPreview(null);
      onClose();
    } catch (err) {
      console.log(err);
      alert('Failed to create post');
    }
  };

  if (!isOpen) return null;

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='create-modal' onClick={(e) => e.stopPropagation()}>
        <div className='create-modal-header'>
          <button className='create-back-btn' onClick={onClose}>
            <i className="bi bi-arrow-left"></i>
          </button>
          <h3>Create new post</h3>
          <button className='create-share-btn' onClick={handleSubmit}>
            Share
          </button>
        </div>

        <div className='create-modal-content'>
          <div className='create-image-section'>
            {preview ? (
              <img src={preview} alt="Preview" className='create-image-preview' />
            ) : (
              <div className='create-image-placeholder'>
                <i className="bi bi-image" style={{fontSize: '64px'}}></i>
                <p>Add a photo</p>
              </div>
            )}
          </div>

          <div className='create-details-section'>
            <div className='create-user-info'>
              <img 
                src="https://i.pravatar.cc/150?img=2" 
                alt="user" 
                className='create-avatar rounded-circle' 
              />
              <span className='create-username'>sandy_0123</span>
            </div>

            <textarea
              className='create-caption-input'
              placeholder='Write a caption...'
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              maxLength={2200}
            />

            <input
              type="text"
              className='create-input'
              placeholder='Image URL (e.g., https://picsum.photos/600/600?random=10)'
              value={imageUrl}
              onChange={handleImageChange}
            />

            <input
              type="text"
              className='create-input'
              placeholder='Add location'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <div className='create-info'>
              <small className='text-secondary'>{caption.length}/2,200</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePostModal;
