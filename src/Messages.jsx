import React, { useState } from 'react';
import BackButton from './BackButton.jsx';

function Messages() {
  const [conversations] = useState([
    {
      id: 1,
      user: {
        username: 'johndoe',
        avatar: 'https://i.pravatar.cc/150?img=12',
        fullName: 'John Doe'
      },
      lastMessage: 'Hey! How are you doing? 😊',
      timestamp: '2h',
      unread: 2,
      isOnline: true
    },
    {
      id: 2,
      user: {
        username: 'emma_wilson',
        avatar: 'https://i.pravatar.cc/150?img=45',
        fullName: 'Emma Wilson'
      },
      lastMessage: 'Thanks for sharing that post!',
      timestamp: '5h',
      unread: 0,
      isOnline: true
    },
    {
      id: 3,
      user: {
        username: 'travel_with_lisa',
        avatar: 'https://i.pravatar.cc/150?img=20',
        fullName: 'Lisa Anderson'
      },
      lastMessage: 'The photos from Paris are amazing! 🗼',
      timestamp: '1d',
      unread: 1,
      isOnline: false
    },
    {
      id: 4,
      user: {
        username: 'fitness_mark',
        avatar: 'https://i.pravatar.cc/150?img=52',
        fullName: 'Mark Johnson'
      },
      lastMessage: 'Want to join me for a workout tomorrow?',
      timestamp: '2d',
      unread: 0,
      isOnline: false
    },
    {
      id: 5,
      user: {
        username: 'foodie_bella',
        avatar: 'https://i.pravatar.cc/150?img=36',
        fullName: 'Isabella Martinez'
      },
      lastMessage: 'That recipe looks delicious! 👨‍🍳',
      timestamp: '3d',
      unread: 0,
      isOnline: true
    },
    {
      id: 6,
      user: {
        username: 'tech_guru_sam',
        avatar: 'https://i.pravatar.cc/150?img=14',
        fullName: 'Samuel Chen'
      },
      lastMessage: 'Check out this new setup guide!',
      timestamp: '4d',
      unread: 0,
      isOnline: false
    }
  ]);

  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className='messages-container d-flex vh-100'>
      <BackButton />
      {/* Conversations List */}
      <div className='conversations-list'>
        <div className='conversations-header'>
          <h4 className='mb-0 m-4'>sandy_0123</h4>
          <i className="bi bi-pencil-square cursor-pointer" style={{fontSize: '24px'}}></i>
        </div>

        <div className='messages-tabs'>
          <button className='messages-tab active'>Primary</button>
          <button className='messages-tab'>General</button>
          <button className='messages-tab'>Requests</button>
        </div>

        <div className='conversations-scroll'>
          {conversations.map(conversation => (
            <div 
              key={conversation.id} 
              className={`conversation-item ${selectedChat?.id === conversation.id ? 'active' : ''}`}
              onClick={() => setSelectedChat(conversation)}
            >
              <div className='position-relative'>
                <img 
                  src={conversation.user.avatar} 
                  alt={conversation.user.username} 
                  className='conversation-avatar rounded-circle' 
                />
                {conversation.isOnline && <span className='online-indicator'></span>}
              </div>
              
              <div className='conversation-info'>
                <div className='d-flex justify-content-between align-items-center'>
                  <span className='conversation-username'>{conversation.user.username}</span>
                  <span className='conversation-time'>{conversation.timestamp}</span>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                  <span className={`conversation-message ${conversation.unread > 0 ? 'unread' : ''}`}>
                    {conversation.lastMessage}
                  </span>
                  {conversation.unread > 0 && (
                    <span className='unread-badge'>{conversation.unread}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className='chat-window'>
        {selectedChat ? (
          <>
            <div className='chat-header'>
              <div className='d-flex align-items-center gap-3'>
                <img 
                  src={selectedChat.user.avatar} 
                  alt={selectedChat.user.username} 
                  className='chat-avatar rounded-circle' 
                />
                <div>
                  <div className='chat-username'>{selectedChat.user.username}</div>
                  <div className='chat-status'>{selectedChat.isOnline ? 'Active now' : 'Active 2h ago'}</div>
                </div>
              </div>
              <div className='d-flex gap-3'>
                <i className="bi bi-telephone cursor-pointer" style={{fontSize: '20px'}}></i>
                <i className="bi bi-camera-video cursor-pointer" style={{fontSize: '20px'}}></i>
                <i className="bi bi-info-circle cursor-pointer" style={{fontSize: '20px'}}></i>
              </div>
            </div>

            <div className='chat-messages'>
              <div className='chat-date'>Today</div>
              
              <div className='message received'>
                <img src={selectedChat.user.avatar} alt="" className='message-avatar rounded-circle' />
                <div className='message-bubble'>{selectedChat.lastMessage}</div>
              </div>

              <div className='message sent'>
                <div className='message-bubble'>That sounds great!</div>
              </div>

              <div className='message received'>
                <img src={selectedChat.user.avatar} alt="" className='message-avatar rounded-circle' />
                <div className='message-bubble'>Yup...</div>
              </div>
            </div>

            <div className='chat-input-container'>
              <i className="bi bi-emoji-smile cursor-pointer" style={{fontSize: '24px'}}></i>
              <input 
                type="text" 
                placeholder='Message...' 
                className='chat-input'
              />
              <i className="bi bi-mic cursor-pointer" style={{fontSize: '24px'}}></i>
              <i className="bi bi-image cursor-pointer" style={{fontSize: '24px'}}></i>
              <i className="bi bi-heart cursor-pointer" style={{fontSize: '24px'}}></i>
            </div>
          </>
        ) : (
          <div className='chat-empty'>
            <i className="bi bi-chat-dots" style={{fontSize: '96px', color: 'var(--text-secondary)'}}></i>
            <h3>Your Messages</h3>
            <p className='text-secondary'>Send photos and messages to a friend or group.</p>
            <button className='btn btn-primary'>Send Message</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
