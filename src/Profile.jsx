import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react';
import BackButton from './BackButton.jsx';
import mockData from '../db/db.json';

// Use environment-aware API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const IS_PRODUCTION = import.meta.env.PROD;

function Profile() {

const [profile, setProfile] = useState(null);
const [followers, setFollowers] = useState([]);

useEffect(() => {
    if (IS_PRODUCTION) {
        // In production, use static mock data
        setProfile(mockData.currentUser);
        setFollowers(mockData.followers);
    } else {
        // In development, fetch from API
        axios.get(`${API_BASE_URL}/currentUser`)
            .then(response => {
                setProfile(response.data);
            })
            .catch(error => {
                console.error('Error fetching profile:', error);
                // Fallback to mock data
                setProfile(mockData.currentUser);
            });
        
        axios.get(`${API_BASE_URL}/followers`)
            .then(response => {
                setFollowers(response.data);
            })
            .catch(error => {
                console.error('Error fetching followers:', error);
                // Fallback to mock data
                setFollowers(mockData.followers);
            });
    }
},[])



function HandleOnChange(e){
    setProfile(prev => ({
        ...prev,
        [e.target.name] : e.target.value
    }))
}



const handleUpdate = async () => {
    if (IS_PRODUCTION) {
        // In production (demo mode), just update local state
        alert("Profile updated successfully! (Demo mode - changes won't persist)");
    } else {
        try {
            // Update profile via API
            await axios.put(`${API_BASE_URL}/currentUser`, profile);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error('Error updating profile:', error);
            alert("Profile updated locally (API unavailable)");
        }
    }
}


const handleUnfollow = async(id) => {
    // Optimistically update UI first
    setFollowers(prevFollowers => 
        prevFollowers.map(follower => 
            follower.id === id 
                ? { ...follower, isUnfollowing: true } 
                : follower
        )
    );
    
    if (!IS_PRODUCTION) {
        try {
            // Delete from API in development
            await axios.delete(`${API_BASE_URL}/followers/${id}`);
        } catch (error) {
            console.error('Error unfollowing user:', error);
        }
    }
    
    // Update state to remove the unfollowed user (works in both modes)
    setTimeout(() => {
        setFollowers(prevFollowers => 
            prevFollowers.filter(follower => follower.id !== id)
        );
    }, 300);
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