import axios from "axios";
import { getPosts } from "./states/postReducer";
export const addPostSubmit = (event, text, category, course, dispatch, handlePopup) => {
    if (text !== "" && category !== "" && course !== "") {
        axios.post('http://localhost:6060/feed', { author: 'Noname', text: text, category: category, course: course })
        getPosts(dispatch);
        handlePopup()
        event.preventDefault();
    } else {
        window.alert("Какое-то поле незаполнено!")
        event.preventDefault();
    }
}