import React from 'react'
import { useState, useEffect } from 'react'

function Posts() {

    const [posts, setPosts] = useState([]);
    useEffect(() => { 
        
        fetch('http://localhost:3001/posts').
        then((data)=>data.json()).
        then((data=> setPosts(data))).
        catch(err=> console.log(err))
},[]);

  return (
    <div className='d-flex justify-content-center'>
        {posts.length > 0 ? (

            <div>
                {posts.map((post)=>(
                    <div className='my-4' key={post.id}>
                        <div className='d-flex m-2'>
                            <img src={post.user.avatar} alt="profile_pic_here" className='dp rounded-circle'></img>
                            <h4 className="username m-2">{post.user.username}</h4>
                            </div>
                            <img src={post.image} alt="posts_here" className='post-pic post_pic'></img>
                            <div>
                                <i class="bi bi-heart"></i>
                                <i class="bi bi-chat"></i>
                                <i class="bi bi-send"></i>
                                </div>
                                <div>
                                   <b> {post.likes} Likes </b>
                                </div>
                                <p>{post.caption}</p>
                            </div>

                ))}
            </div>
        ):(
            <div>
                Loading Posts
            </div>
        )}

    </div>
  )
}

export default Posts