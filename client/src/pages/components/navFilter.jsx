import { Refetch } from "./Refetch"

export const filterCategory = (e, dispatch, setCategory, sort, category) => {
    dispatch(setCategory(e.target.value))
    Refetch(dispatch, sort, category)
}
export const filterSort = (e, dispatch, setSort, sort, category) => {
    dispatch(setSort(e.target.value))
    Refetch(dispatch, sort, category)
}