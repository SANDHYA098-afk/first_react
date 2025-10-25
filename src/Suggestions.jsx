import React, { useEffect, useState } from 'react'
import axios from 'axios'
import mockData from '../db/db.json'

function Suggestions() {

const [profile, setProfile] = useState(mockData.currentUser || null);
const [suggestions, setSuggestions] = useState(mockData.suggestions || []);

useEffect(() => {  
    // Data is already loaded from mockData
    setProfile(mockData.currentUser || null);
    setSuggestions(mockData.suggestions || []);
},[]);


const handleFollow = async (id, username) => {
    // Optimistically update UI first
    setSuggestions(prevSuggestions => 
        prevSuggestions.map(suggestion => 
            suggestion.id === id 
                ? { ...suggestion, isFollowing: true } 
                : suggestion
        )
    )
    
    // Since we're using static data, just remove after a delay
    setTimeout(() => {
        setSuggestions(prevSuggestions => 
            prevSuggestions.filter(suggestion => suggestion.id !== id)
        )
    }, 500)
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
                            <a 
                                className={`follow ms-auto ${suggestion.isFollowing ? 'text-secondary' : 'text-primary'}`}
                                onClick={() => handleFollow(suggestion.id, suggestion.username)}
                                style={{ cursor: suggestion.isFollowing ? 'default' : 'pointer' }}
                            >
                                {suggestion.isFollowing ? 'Following' : 'Follow'}
                            </a>
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
