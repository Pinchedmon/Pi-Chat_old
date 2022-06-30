import './Popup.css'
import axios from 'axios'
import React, {useState} from 'react'
const Popup = (props) => {

    const handleAdd = (event) => {
        props.handlePopup()
        axios.post('http://localhost:6060/feed', { author: 'Noname', text: text, category: category, course: course })
        event.preventDefault();
        
     }
    const [text, setText] = useState('');
    const [category, setCategory] = useState('');
    const [course, setCourse] = useState('')
    const handleText = (event) => {
        setText(event.target.value)
    }
    const handleCategory = (event) => {
        setCategory(event.target.value)
    }
    const handleCourse = (event) => {
        setCourse(event.target.value)
        
    }
    console.log(props.handlePopup)
    return (
        <>
        <form onSubmit={handleAdd}>
            <h1>Создание поста</h1>
            <select value={category} onChange={handleCategory}>
                <option value="value1" disabled selected>Категория</option>
                <option value="Общее">Общее</option>
                <option value="Предметы">Предметы</option>
                <option value="Вопросы">Вопросы</option>
            </select>
            <select value={course} onChange={handleCourse}>
                <option disabled selected>Курс</option>
                <option value="1">1</option>
                <option value="2" >2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>   
            <textarea value={text} onChange={handleText} className="popup__textarea">
            </textarea>
            
            <button>Добавить пост</button>
            </form>
        </>

    )
}
export default Popup;