import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react';
import BackButton from './BackButton.jsx';

function Profile() {

const [profile, setProfile] = useState(null);
const [followers, setFollowers] = useState([]);

useEffect(() => {
    // Fetch current user profile from API
    axios.get('http://localhost:3001/currentUser')
        .then(response => {
            setProfile(response.data);
        })
        .catch(error => {
            console.error('Error fetching profile:', error);
        });
    
    // Fetch followers from API
    axios.get('http://localhost:3001/followers')
        .then(response => {
            setFollowers(response.data);
        })
        .catch(error => {
            console.error('Error fetching followers:', error);
        });
},[])



function HandleOnChange(e){
    setProfile(prev => ({
        ...prev,
        [e.target.name] : e.target.value
    }))
}



const handleUpdate = async () => {
    try {
        // Update profile via API
        await axios.put('http://localhost:3001/currentUser', profile);
        alert("Profile updated successfully!");
    } catch (error) {
        console.error('Error updating profile:', error);
        alert("Failed to update profile. Please try again.");
    }
}


const handleUnfollow = async(id) => {
    try {
        // Optimistically update UI first
        setFollowers(prevFollowers => 
            prevFollowers.map(follower => 
                follower.id === id 
                    ? { ...follower, isUnfollowing: true } 
                    : follower
            )
        );
        
        // Delete from API
        await axios.delete(`http://localhost:3001/followers/${id}`);
        
        // Update state to remove the unfollowed user
        setFollowers(prevFollowers => 
            prevFollowers.filter(follower => follower.id !== id)
        );
    } catch (error) {
        console.error('Error unfollowing user:', error);
        // Revert UI on error
        setFollowers(prevFollowers => 
            prevFollowers.map(follower => 
                follower.id === id 
                    ? { ...follower, isUnfollowing: false } 
                    : follower
            )
        );
    }
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