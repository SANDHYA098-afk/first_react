import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react';
import BackButton from './BackButton.jsx';
import mockData from '../db/db.json'

function Profile() {

const [profile, setProfile] = useState(mockData.currentUser || null);
const [followers, setFollowers] = useState(mockData.followers || []);

useEffect(() => {
    // Data is already loaded from mockData
    setProfile(mockData.currentUser || null);
    setFollowers(mockData.followers || []);
},[])



function HandleOnChange(e){
    setProfile(prev => ({
        ...prev,
        [e.target.name] : e.target.value
    }))
}



const handleUpdate = async () => {
    console.log("Profile updated locally", profile);
    // Since we're using static data, just show a success message
    alert("Profile updated successfully!");
}


const handleUnfollow = async(id) => {
    // Optimistically update UI first
    setFollowers(prevFollowers => 
        prevFollowers.map(follower => 
            follower.id === id 
                ? { ...follower, isUnfollowing: true } 
                : follower
        )
    )
    
    // Remove from list after a delay (simulating API call)
    setTimeout(() => {
        setFollowers(prevFollowers => 
            prevFollowers.filter(follower => follower.id !== id)
        )
    }, 300)
}




  return (
    <div className='m-5'>
      <BackButton />

{
    profile ? (
        <div>
            <img src={profile.avatar} alt="profile" className='main_profile rounded-circle' />
            <h2>{profile.username}</h2>
            
<input type="text" value={profile.username} name="username" className='form-control my-4' onChange={HandleOnChange} />

<input type="text" name="avatar" value={profile.avatar} className='form-control my-4' onChange={HandleOnChange} />

<button className='btn btn-primary my-4' onClick={handleUpdate} >
    Update
</button>

        </div>
    ) : (
        <div>Loading...</div>
    )
}


{
    followers.length > 0 ? (
        <div>
            <h4 className='my-3'>Following</h4>
            {followers.map(follower => (
                <div key={follower.id} className='d-flex align-items-center my-3 p-2 hover-bg rounded'>
                    <i className="bi bi-person-circle" style={{fontSize: '24px', marginRight: '10px'}}></i>
                    <span className='fw-bold'>{follower.username}</span>
                    <button 
                        className={`btn ms-auto ${follower.isUnfollowing ? 'btn-secondary' : 'btn-outline-primary'}`}
                        onClick={() => handleUnfollow(follower.id)}
                        disabled={follower.isUnfollowing}
                    >
                        {follower.isUnfollowing ? 'Unfollowing...' : 'Unfollow'}
                    </button>
                </div>
            ))}
        </div>
    ) : (
        <div className='text-center my-4 text-secondary'>
            Not following anyone yet
        </div>
    )
}

    </div>
  )
}

export default Profile