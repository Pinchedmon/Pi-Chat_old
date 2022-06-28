import './Posts.css'
const Posts = (props) => {
    let posts = props.data
    return (<div>
            {posts.map(item => 
            <div className="post"><p className="post__author">{item.author}</p><p className="post__info">{item.text}</p></div>
            )}
    </div>)
}
export default Posts;