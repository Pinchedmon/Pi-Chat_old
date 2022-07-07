import { refetch } from "./states/postReducer"
import axios from "axios"
export const Refetch = (dispatch, sort, category) => {
     axios.get(`http://localhost:6060/feed?sort=${sort}&category=${category}`)
        .then(response => {
            dispatch(refetch(response.data.data))
        })
}