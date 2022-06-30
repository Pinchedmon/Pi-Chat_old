import './Posts.css'
const Posts = (props) => {
    let posts = props.data
    let category = props.category;
    let sort = props.sort;
    let sortedPosts;
    if (sort !== 'Late') {
        sortedPosts = posts.filter(post => post.category === category).filter(post => post.course === sort)

    } else sortedPosts = posts.sort((a, b) => {
        return b.id - a.id;
    }).filter(post => post.category === category);
    return (<div>
        {sortedPosts.map((item, index) =>
            <div key={index} className="post">
                <p className="post__author">{item.author}</p>
                <p className="post__info">{item.text}</p>
                <button className="post__likes">likes</button>
                <button className="post__comments">comments</button>
            </div>
        )}
    </div>)
}
export default Posts;