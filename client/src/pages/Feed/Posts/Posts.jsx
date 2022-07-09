import './Posts.css'
import React from 'react';
import axios from 'axios';
import { getPosts } from '../../components/states/postReducer';
import { useEffect, useCallback, useRef } from 'react';
const Posts = (props) => {
    let posts = [...props.data];
    const ref = useRef(posts)
    const { dispatch, sort, category } = props
    const deleteButton = (id) => {
        axios.delete(`http://localhost:6060/feed?id=${id}`)
        getPosts(dispatch, sort, category);
    }   
    useEffect(() => {
        getPosts(dispatch, sort, category)
    }, [sort, category, ref, posts.key, dispatch])
    return (
        <div>
            {posts.reverse().map((item, index) =>
                <div key={index} className="post max-w-md mx-auto shadow-md overflow-hidden md:max-w-3xl">
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