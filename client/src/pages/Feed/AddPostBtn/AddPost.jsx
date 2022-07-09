import React from 'react'
import './AddPost.css'
import { XIcon } from '@heroicons/react/outline'
import { useSelector } from 'react-redux'
import { setCategory, setCourse, setText } from '../../components/states/addPostBtnReducer'
import { addPostSubmit } from '../../components/addPostSubmit'
const AddPost = (props) => {
    const { dispatch, handlePopup } = props;
    const category = useSelector(state => state.addPostBtn.category);
    const text = useSelector(state => state.addPostBtn.text);
    const course = useSelector(state => state.addPostBtn.course);
    return (
        <div className="popup flex justify-center items-center ">
            <div className="absolute w-96 h-96 bg-white rounded-lg">
                <button onClick={handlePopup}className="bg-white rounded-md p-2 flex items-center float-right justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                <XIcon className="h-6 w-6 text-green-600" />
                </button>
                <form className="w-100% text-center flex flex-col mt-10" onSubmit={(e) => addPostSubmit(e, text, category, course, dispatch, handlePopup)}>
                    <h1 className="text-2xl text-green-600">Создание поста</h1>
                   <div className="flex flex-row justify-evenly mt-4">
                    <h4 className="text-lg mt-3"> Категория</h4>
                    <h4 className="text-lg mt-3"> Курс</h4>
                    </div>
                    <div className="flex flex-row justify-evenly mt-4">
                    <select className="w-20" value={category} onChange={(e) => dispatch(setCategory(e.target.value))}>
                        <option value="value1" disabled >Категория</option>
                        <option value="Общее" >Общее</option>
                        <option value="Предметы">Предметы</option>
                        <option value="Вопросы">Вопросы</option>
                    </select>
                    <select value={course} onChange={(e) => dispatch(setCourse(e.target.value))}>
                        <option disabled >Курс</option>
                        <option value="1" >1</option>
                        <option value="2" >2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    </div>
                    <textarea className="resize-none w-72 m-auto h-20 border-2 border-green-600 rounded-lg mt-10 p-2 focus:outline-none focus:border-green-700" value={text} onChange={(e) => dispatch(setText(e.target.value))}>
                    </textarea>
                    <button className="text-lg mt-8 text-green-600 hover:text-green-700">Добавить пост</button>
                </form>
            </div>
        </div>
    )
}
export default AddPost;