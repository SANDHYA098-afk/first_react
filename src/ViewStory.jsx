import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'


function ViewStory() {

const {id, tot} = useParams();

const [story, setStory] = useState(null);

const navigate = useNavigate();

useEffect(() => {
  fetch(`http://localhost:3001/stories?id=${id}`)
  .then(data => data.json())
  .then(data => setStory(data[0]))
  .catch(err => console.log(err))
}, [id]);

if (id > tot || id < 1){
  navigate('/');
}

  return (
    <div>
      {
      story?
      <div className='d-flex justify-content-center align-items-center'>{story.user.username}

      

      <Link to={`http://localhost:5173/story/${Number(id)-1}/${tot}`} ><i className="bi bi-arrow-left-circle"></i></Link>
      
      <img src={story.image} alt="story" className='vh-100' />  

      <Link to={`http://localhost:5173/story/${Number(id)+1}/${tot}`} ><i className="bi bi-arrow-right-circle"></i></Link>
      
      
      
      
      </div> 
      
      
      
      
      
      
      
      
      
      : <div>Loading...</div>
      }
      </div>
  )
}

export default ViewStory  