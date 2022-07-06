import './Nav.css'
import Posts from './../Posts/Posts'
import React, { useState} from "react"
import Popup from "../AddPostBtn/AddPost";
import { DeletePost } from '../../components/deletePost';
import { useSelector } from "react-redux";
import { setCategory, setSort } from "../../components/states/navReducer";
const Nav = (props) => {
    const {dispatch, data} = props
    const sort = useSelector(state => state.nav.sort);
    const category = useSelector(state => state.nav.category);
    const [popup, setPopup] = useState('nav__add');
    
    const handlePopup = () => {
        if (popup === 'nav__add-popup') { setPopup('nav__add') } else {
            setPopup('nav__add-popup')
        }
    }
    return (    
        <>
            <div className="nav__logo"><button onClick={() => DeletePost(dispatch)}>/ π - Чат /</button></div>
            <div className="nav__profile"><button >Профиль</button></div>
            <select  value={sort} onChange={(e)=> dispatch(setSort(e.target.value))}>
                <option  value="value1" disabled>Сортировать по</option>
                <option value="1">1 Курс</option>
                <option value="2">2 Курс</option>
                <option value="3">3 Курс</option>
                <option value="4">4 Курс</option>
                <option value="Late" >Последнее</option>
            </select>
            <select value={category} onChange={(e)=> dispatch(setCategory(e.target.value))}>
                <option value="value1" disabled >Категория</option>
                <option value="Общее">Общее</option>
                <option value="Предметы" >Предметы</option>
                <option value="Вопросы">Вопросы</option>
            </select>
            {popup === 'nav__add-popup' && <Popup handlePopup={handlePopup} />}
            <button className={popup}  onClick={handlePopup}>Добавить пост</button>
            <Posts data={data}/>
        </>
    )
}
export default Nav;