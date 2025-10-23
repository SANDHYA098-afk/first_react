import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react';

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
    axios.delete(`http://localhost:3001/followers/${id}`)
    .then(() => {
        alert("unfollowed")
        // Update local state to remove the unfollowed user from UI
        setFollowers(prevFollowers => prevFollowers.filter(follower => follower.id !== id))
    })
    .catch(err => console.log(err))
}




  return (
    <div className='m-5'>

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
        followers.map(follower => (
            <div key={follower.id} className='d-flex my-2' >
                {follower.username}
                <button className='btn btn-primary ms-auto' onClick={()=>{handleUnfollow(follower.id)}} >Unfollow</button>



                </div>
        ))
    ) : (
        <div>
            Loading followers
            </div>
    )
}

    </div>
  )
}

export default Profile