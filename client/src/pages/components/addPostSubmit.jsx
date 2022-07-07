import axios from "axios";
import { Refetch } from "./Refetch";
export const addPostSubmit = (event, text, category, course, dispatch, handlePopup) => {
    if (text !== "" && category !== "" && course !== "") {
        axios.post('http://localhost:6060/feed', { author: 'Noname', text: text, category: category, course: course })
        handlePopup()
        Refetch(dispatch);
        event.preventDefault();
    } else {
        window.alert("Какое-то поле незаполнено!")
        event.preventDefault();
    }
}