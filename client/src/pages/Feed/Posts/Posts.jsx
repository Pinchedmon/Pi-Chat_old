import './Posts.css'
import React from 'react';
const Posts = (props) => {
    let posts = props.data.posts;
    return (
    <div>
        {posts.map((item, index) =>
            <div key={index} className="post">
                <p className="post__author">{item.author}</p>
                <p className="post__info">{item.text}</p>
                <button className="post__likes">likes</button>
                <button className="post__comments">comments</button>
            </div>
        )
        }
    </div>
    )
}
export default Posts;