import axios from "axios"
import { Refetch } from "./Refetch"
export const DeletePost = (dispatch) => {
    axios.delete('http://localhost:6060/feed')
    Refetch(dispatch)
}
