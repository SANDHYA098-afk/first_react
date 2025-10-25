import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import instagramText from './assets/TsukiGRAM.png'
import { useTheme } from './ThemeContext.jsx'
import SearchModal from './SearchModal.jsx'
import CreatePostModal from './CreatePostModal.jsx'
import NotificationsModal from './NotificationsModal.jsx'
import MoreModal from './MoreModal.jsx'

function Sidebar() {

const navigate = useNavigate();
const { theme, toggleTheme } = useTheme();
const [isSearchOpen, setIsSearchOpen] = useState(false);
const [isCreateOpen, setIsCreateOpen] = useState(false);
const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
const [isMoreOpen, setIsMoreOpen] = useState(false);

  const handleHomeClick = () => {
    window.location.href = '/';
  };

  return (
    <>
    <div className='m-3 position-fixed'>
    <div className='d-flex flex-column gap-3'>
        <img src={instagramText} alt="INSTAGRAM" className='img-size px-1' />
        <div className='sidebar-item' onClick={handleHomeClick}>
          <i className="bi bi-house-fill"></i>Home
        </div>
        <div className='sidebar-item' onClick={() => setIsSearchOpen(true)}>
          <i className="bi bi-search"></i>Search
        </div>
        <div className='sidebar-item'>
          <i className="bi bi-compass"></i>Explore
        </div>
        <div className='sidebar-item'>
          <i className="bi bi-camera-reels"></i>Reels
        </div>
        <div className='sidebar-item' onClick={() => navigate('/messages')}>
          <i className="bi bi-chat-left"></i>Messages
        </div>
        <div className='sidebar-item' onClick={() => setIsNotificationsOpen(true)}>
          <i className="bi bi-app-indicator"></i>Notifications
        </div>
        <div className='sidebar-item' onClick={() => setIsCreateOpen(true)}>
          <i className="bi bi-plus-square"></i>Create
        </div>
        <div className='sidebar-item' onClick={() => navigate('/profile')}>
          <i className="bi bi-person-circle"></i>Profile
        </div>
    </div>

            <div className='d-flex flex-column gap-3 position-fixed bottom-0 mb-3'>
                <div className='sidebar-item'><i className="bi bi-threads"></i>Threads</div>
                <div className='sidebar-item' onClick={() => setIsMoreOpen(true)}>
                  <i className="bi bi-list-nested"></i>More
                </div>
            </div>

                </div>
                
      {/* Modals */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CreatePostModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
      <NotificationsModal isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
      <MoreModal isOpen={isMoreOpen} onClose={() => setIsMoreOpen(false)} />
    </>
  )
}

export default Sidebar