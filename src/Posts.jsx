import React from 'react'
import { useState, useEffect } from 'react'

function Posts() {

    const [posts, setPosts] = useState([]);
    
    useEffect(() => { 
        fetch('http://localhost:3001/posts')
        .then((data)=>data.json())
        .then((data=> setPosts(data)))
        .catch(err=> console.log(err))
    },[]);

    const handleLike = (postId) => {
        setPosts(prevPosts => 
            prevPosts.map(post => 
                post.id === postId 
                    ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
                    : post
            )
        );
    };

    const handleSave = (postId) => {
        setPosts(prevPosts => 
            prevPosts.map(post => 
                post.id === postId 
                    ? { ...post, isSaved: !post.isSaved }
                    : post
            )
        );
    };

  return (
    <div className='d-flex justify-content-center'>
        {posts.length > 0 ? (
            <div>
                {posts.map((post)=>(
                    <div className='post-card my-4 card-bg rounded' key={post.id}>
                        {/* Post Header */}
                        <div className='d-flex align-items-center m-3'>
                            <img src={post.user.avatar} alt="profile" className='dp rounded-circle'></img>
                            <div className='flex-grow-1'>
                                <h4 className="username m-0">
                                    {post.user.username}
                                    {post.user.isVerified && <i className="bi bi-patch-check-fill ms-1 text-primary"></i>}
                                </h4>
                                {post.location && <small className='text-secondary'>{post.location}</small>}
                            </div>
                            <i className="bi bi-three-dots cursor-pointer"></i>
                        </div>
                        
                        {/* Post Image */}
                        <img src={post.image} alt="post" className='post_pic border-theme' onDoubleClick={() => handleLike(post.id)}></img>
                        
                        {/* Post Actions */}
                        <div className='d-flex align-items-center p-3 gap-3'>
                            <i 
                                className={`bi bi-heart${post.isLiked ? '-fill text-danger' : ''} post-icon`}
                                onClick={() => handleLike(post.id)}
                            ></i>
                            <i className="bi bi-chat post-icon"></i>
                            <i className="bi bi-send post-icon"></i>
                            <i 
                                className={`bi bi-bookmark${post.isSaved ? '-fill' : ''} post-icon ms-auto`}
                                onClick={() => handleSave(post.id)}
                            ></i>
                        </div>
                        
                        {/* Likes Count */}
                        <div className='px-3 pb-2'>
                            <b>{post.likes.toLocaleString()} likes</b>
                        </div>
                        
                        {/* Caption */}
                        <div className='px-3 pb-2'>
                            <span className='username me-2'>{post.user.username}</span>
                            <span>{post.caption}</span>
                        </div>
                        
                        {/* Comments Preview */}
                        {post.comments && post.comments.length > 0 && (
                            <div className='px-3 pb-2'>
                                <div className='text-secondary cursor-pointer' style={{fontSize: '14px'}}>
                                    View all {post.comments.length} comments
                                </div>
                            </div>
                        )}
                        
                        {/* Timestamp */}
                        <div className='px-3 pb-3'>
                            <small className='text-secondary' style={{fontSize: '12px'}}>{post.timestamp}</small>
                        </div>
                    </div>
                ))}
            </div>
        ):(
            <div className='text-center my-5'>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )}
    </div>
  )
}

export default Posts