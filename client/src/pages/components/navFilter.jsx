import { getPosts } from "./states/postReducer"

export const filterCategory = (e, dispatch, setCategory, sort, category) => {
    dispatch(setCategory(e.target.value))
    getPosts(dispatch, sort, category)
}
export const filterSort = (e, dispatch, setSort, sort, category) => {
    dispatch(setSort(e.target.value))
    getPosts(dispatch, sort, category)
}