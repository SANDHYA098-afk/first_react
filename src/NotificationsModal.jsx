import React from 'react';

function NotificationsModal({ isOpen, onClose }) {
  const notifications = [
    {
      id: 1,
      type: 'like',
      user: {
        username: 'johndoe',
        avatar: 'https://i.pravatar.cc/150?img=12'
      },
      message: 'liked your post.',
      time: '2h',
      postImage: 'https://picsum.photos/100/100?random=1'
    },
    {
      id: 2,
      type: 'follow',
      user: {
        username: 'emma_wilson',
        avatar: 'https://i.pravatar.cc/150?img=45'
      },
      message: 'started following you.',
      time: '5h'
    },
    {
      id: 3,
      type: 'comment',
      user: {
        username: 'travel_with_lisa',
        avatar: 'https://i.pravatar.cc/150?img=20'
      },
      message: 'commented: "Amazing shot! 😍"',
      time: '1d',
      postImage: 'https://picsum.photos/100/100?random=2'
    },
    {
      id: 4,
      type: 'like',
      user: {
        username: 'fitness_mark',
        avatar: 'https://i.pravatar.cc/150?img=52'
      },
      message: 'liked your post.',
      time: '2d',
      postImage: 'https://picsum.photos/100/100?random=3'
    }
  ];

  if (!isOpen) return null;

  return (
    <div className='notifications-modal'>
      <div className='notifications-header'>
        <h3>Notifications</h3>
        <button className='notifications-close-btn' onClick={onClose}>
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      <div className='notifications-content'>
        <div className='notifications-section'>
          <div className='notifications-section-title'>Today</div>
          {notifications.slice(0, 2).map(notification => (
            <div key={notification.id} className='notification-item'>
              <img 
                src={notification.user.avatar} 
                alt={notification.user.username} 
                className='notification-avatar rounded-circle' 
              />
              <div className='notification-text'>
                <span className='notification-username'>{notification.user.username}</span>
                {' '}
                <span className='notification-message'>{notification.message}</span>
                {' '}
                <span className='notification-time'>{notification.time}</span>
              </div>
              {notification.postImage && (
                <img 
                  src={notification.postImage} 
                  alt="post" 
                  className='notification-post-thumb' 
                />
              )}
              {notification.type === 'follow' && (
                <button className='notification-follow-btn'>Follow</button>
              )}
            </div>
          ))}
        </div>

        <div className='notifications-section'>
          <div className='notifications-section-title'>This Week</div>
          {notifications.slice(2).map(notification => (
            <div key={notification.id} className='notification-item'>
              <img 
                src={notification.user.avatar} 
                alt={notification.user.username} 
                className='notification-avatar rounded-circle' 
              />
              <div className='notification-text'>
                <span className='notification-username'>{notification.user.username}</span>
                {' '}
                <span className='notification-message'>{notification.message}</span>
                {' '}
                <span className='notification-time'>{notification.time}</span>
              </div>
              {notification.postImage && (
                <img 
                  src={notification.postImage} 
                  alt="post" 
                  className='notification-post-thumb' 
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NotificationsModal;
