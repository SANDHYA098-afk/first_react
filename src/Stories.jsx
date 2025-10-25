import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import mockData from '../db/db.json'

function Stories() {

const [Stories, setStories] = useState(mockData.stories || []);

const navigate = useNavigate();

let tot = 0;

useEffect(()=>{
  // Data is already loaded from mockData
  setStories(mockData.stories || []);
},[]);

  return (
    <div className='stories d-flex'>

<div className='d-none'>
      {tot=Stories.length}

      </div>

{Stories.length > 0 ?
(
  Stories.map((story)=>(
    <div key={story.id} className='mx-1' onClick={() => {navigate(`/story/${story.id}/${tot}`)}} >

      <div className="gradient-border">
      <img src={story.user.avatar} alt="stories" className='story-dp rounded-circle'></img>
</div>


      <p className='text-truncate' style={{width:"70px"}}>{story.user.username}</p>


    </div>
    
  ))
):
(
  <p>loading..</p>
)}
      
 </div>
  )
}

export default Stories