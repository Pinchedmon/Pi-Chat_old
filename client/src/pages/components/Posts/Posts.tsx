import React from 'react';
import axios from 'axios';
import { getPosts } from '../../../api/getPosts';
interface IPosts {
    data: any;
    sort: string | number;
    category: string;
}
const Posts = (props: IPosts) => {
    const {sort, category, data} = props
    let posts = data
    const deleteButton = (id: number) => {
        axios.delete(`http://localhost:6060/feed?id=${id}`)
        getPosts({sort, category});
    }
    return (
        <div className="pt-24">
            { posts.reverse().map((item: any, index: number) =>
                <div key={index} className="post max-w-md mx-auto shadow-md overflow-hidden md:max-w-3xl">
                    <p className="post__author">{item.author}</p>
                    <p className="post__info">{item.text}</p>
                    <button onClick={() => deleteButton(item.ID) } className="post__likes">delete</button>
                    <button className="post__comments">comments</button>
                </div>)
            }
        </div>
    )
}
export default Posts;