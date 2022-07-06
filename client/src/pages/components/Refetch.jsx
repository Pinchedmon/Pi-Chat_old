import { refetch } from "./states/postReducer"
import axios from "axios"
export const Refetch = (dispatch) => {
     axios.get('http://localhost:6060/feed')
        .then(response => {
            dispatch(refetch(response.data.data))
        })
}