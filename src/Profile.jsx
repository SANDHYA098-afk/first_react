import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react';
import BackButton from './BackButton.jsx';

function Profile() {

const [profile, setProfile] = useState(null);

const [followers, setFollowers] = useState([]);

useEffect(() => {

    axios.get('http://localhost:3001/currentUser')
    .then(data => setProfile(data.data))
    .catch(err => console.log(err))

    axios.get('http://localhost:3001/followers')
    .then(data => setFollowers(data.data))
    .catch(err => console.log(err))

},[])



function HandleOnChange(e){
    setProfile(prev => ({
        ...prev,
        [e.target.name] : e.target.value
    }))
}



const handleUpdate = async () => {

axios.put('http://localhost:3001/currentUser', profile)
.then(console.log("updated"))
.catch(err => console.log(err))

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
    
    try {
        await axios.delete(`http://localhost:3001/followers/${id}`)
        // Remove from list after successful delete
        setTimeout(() => {
            setFollowers(prevFollowers => 
                prevFollowers.filter(follower => follower.id !== id)
            )
        }, 300)
    } catch (err) {
        console.log(err)
        // Revert on error
        setFollowers(prevFollowers => 
            prevFollowers.map(follower => 
                follower.id === id 
                    ? { ...follower, isUnfollowing: false } 
                    : follower
            )
        )
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