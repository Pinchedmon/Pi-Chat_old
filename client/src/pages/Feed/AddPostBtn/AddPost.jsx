import './AddPost.css'
import React from 'react'
import { useSelector } from 'react-redux'
import { setCategory, setCourse, setText } from '../../components/states/addPostBtnReducer'
import { addPostSubmit } from '../../components/addPostSubmit'
const AddPost = (props) => {
    const { dispatch, handlePopup} = props;
    const category = useSelector(state => state.addPostBtn.category);
    const text = useSelector(state => state.addPostBtn.text);
    const course = useSelector(state => state.addPostBtn.course);
    return (
        <>
            <form onSubmit={(e)=> addPostSubmit(e, text,category,course,dispatch,handlePopup)}>
                <h1>Создание поста</h1>
                <select value={category} onChange={(e) => dispatch(setCategory(e.target.value))}>
                    <option value="value1" disabled >Категория</option>
                    <option selected value="Общее" >Общее</option>
                    <option value="Предметы">Предметы</option>
                    <option value="Вопросы">Вопросы</option>
                </select>
                <select value={course} onChange={(e) => dispatch(setCourse(e.target.value))}>
                    <option disabled >Курс</option>
                    <option selected value="1" >1</option>
                    <option value="2" >2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <textarea value={text} onChange={(e) => dispatch(setText(e.target.value))} className="popup__textarea">
                </textarea>
                <button>Добавить пост</button>
            </form>
        </>
    )
}
export default AddPost;