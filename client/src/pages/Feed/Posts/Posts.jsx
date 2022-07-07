import './Posts.css'
import React from 'react';
import axios from 'axios';
const Posts = (props) => {
    let posts = [...props.data.posts];
    const deleteButton = (id) => {
        axios.delete(`http://localhost:6060/feed?id=${id}`)
        console.log(id)
    }
    return (
    <div>
        {posts.reverse().map(item =>
            <div key={item.ID} className="post">
                <p className="post__author">{item.author}</p>
                <p className="post__info">{item.text}</p>
                <button value={item.ID} onClick={(e) => deleteButton(e.target.value)} className="post__likes">delete</button>
                <button className="post__comments">comments</button>
            </div>
        )
        }
    </div>
    )
}
export default Posts;