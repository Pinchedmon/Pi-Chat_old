import axios from "axios";
interface apiPayload {
    text: string;
    category: string;
    course: string | number; 
}
export const addPost = (payload: apiPayload) => {
    const { text, category, course} = payload
       return axios.post('http://localhost:6060/feed', { author: 'Noname', text: text, category: category, course: course })
}