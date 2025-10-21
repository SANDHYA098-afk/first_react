import React, { useEffect } from 'react'
import { useState } from 'react'

function Stories() {

const [Stories, setStories] = useState([]);

useEffect(()=>{
  fetch('http://localhost:3001/stories')
  .then(data=>data.json())
  .then(data=>setStories(data))
  .catch(err=>console.log(err))
},[]);

  return (
    <div className='stories d-flex'>

{Stories.length > 0 ?
(
  Stories.map((story)=>(
    <div key={story.id} className='mx-1'>

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