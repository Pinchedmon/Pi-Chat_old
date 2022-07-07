import './Feed.css'
import Posts from './Posts/Posts'
import Nav from './Nav/Nav';
import {useEffect} from 'react'
import { useSelector } from "react-redux";
import { Refetch } from '../components/Refetch';
const Feed = (props) => {
    const { dispatch} = props;
    const posts = useSelector(state => state.posts);
    const sort = useSelector(state => state.nav.sort);
    const category = useSelector(state => state.nav.category);
    useEffect(() => {
        Refetch(dispatch, sort, category)
      },[])
    return (
        <>
            <Nav sort={sort} category={category} dispatch={dispatch} />
            <Posts data={posts} />
        </>
    )
}

export default Feed;