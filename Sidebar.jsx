import React from 'react'
import instagramText from './assets/insta-text.png'
function Sidebar() {
  return (
    <div className='m-3 position-fixed'>
    <div className='d-flex flex-column gap-3'>
        <img src={instagramText} alt="INSTAGRAM" className='img-size px-1' />
        <div><i className="bi bi-house"></i>Home</div>
        <div><i className="bi bi-search"></i>Search</div>
        <div><i className="bi bi-compass"></i>Explore</div>
        <div><i className="bi bi-camera-reels"></i>Reels</div>
        <div><i className="bi bi-chat-left"></i>Messages</div>
        <div><i className="bi bi-app-indicator"></i>Notifications</div>
        <div><i className="bi bi-plus-square"></i>Create</div>
        <div><i className="bi bi-person-circle"></i>Profile</div>
    </div>

            <div className='d-flex flex-column gap-3 position-fixed bottom-0' mb-3>
                <div><i className="bi bi-threads"></i>Threads</div>
                <div><i className="bi bi-list-nested"></i>More</div>
            </div>

                </div>
  )
}

export default Sidebar