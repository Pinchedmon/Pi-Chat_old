import Posts from './Posts/Posts'
import Nav from './Nav/Nav';
import { useSelector } from "react-redux";
const Feed = (props) => {
    const { dispatch } = props;
    const posts = useSelector(state => state.posts.posts)
    const sort = useSelector(state => state.nav.sort);
    const category = useSelector(state => state.nav.category);
    console.log('jsdjajdksa');
    return (
        <>
            <Nav sort={sort} category={category} dispatch={dispatch} />
            <Posts sort={sort} category={category} dispatch={dispatch} data={posts} />
        </>
    )
}
export default Feed;
