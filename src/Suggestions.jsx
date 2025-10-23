import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Suggestions() {

const [profile, setProfile] = useState(null);
const [suggestions, setSuggestions] = useState([]);

useEffect(() => {  

    fetch('http://localhost:3001/currentUser')
    .then(data => data.json())
    .then(data => setProfile(data))
    .catch(err => console.log(err))

    fetch('http://localhost:3001/suggestions')
    .then(data => data.json())
    .then(data => setSuggestions(data))
    .catch(err => console.log(err))

},[]);


const handleFollow = async (id, username) => {
    axios.post('http://localhost:3001/followers', {"id":id, "username":username})
    .then(() => {
        alert("followed")
        // Update local state to remove followed user from suggestions
        setSuggestions(prevSuggestions => prevSuggestions.filter(suggestion => suggestion.id !== id))
    })
    .catch(err => console.log(err))
}

  return (
    <div>
        <div className='suggestions w-75 m-3'>
        {profile ?
        <div className='d-flex m-2'>
                            <img src={profile.avatar} alt="profile_pic_here" className='dp rounded-circle'></img>
                            <h4 className="username m-2">{profile.username}</h4>
                            <p className='switch ms-auto text-primary'>switch</p>
                            </div>
                            : <p>loads...</p> }

                            <div className='d-flex pt-3 px-4'>
                                <p className='sug4u'>Suggested for you</p>
                                <b className='seeall ms-auto'>See All</b>
                            </div>


 {suggestions.length > 0 ? (

            <div>
                {suggestions.map((suggestion)=>(
                    <div className='my-4' key={suggestion.id}>
                        <div className='d-flex m-2'>
                            <img src={suggestion.avatar} alt="profile_pic_here" className='dp rounded-circle'></img>
                            <h4 className="suggest_name m-2">{suggestion.username}</h4>
                            <a className='follow text-primary ms-auto' onClick = {()=>handleFollow(suggestion.id, suggestion.username)} >follow</a>
                        </div>
                    </div>
                ))}
            </div>
        ):(
            <div>
                Loading...
            </div>
        )}

        </div>
    </div>
  )
}

export default Suggestions
