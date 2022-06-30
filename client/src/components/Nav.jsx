import axios from "axios"
import './Nav.css'
import React, { useState } from "react"
import Popup from "./Popup";
const Nav = () => {
    const [popup, setPopup] = useState('nav__add');
    const handleDelete = () => {
        axios.delete('http://localhost:6060/feed')
    }
    const handlePopup = () => {
        if (popup === 'nav__add-popup') { setPopup('nav__add') } else {
            setPopup('nav__add-popup')
        }
    }
    const handlePopupon = () => {
        setPopup('nav__add');
    }
    return (
        <>
            <div className="nav__logo"><button>/ π - Чат /</button></div>
            <div className="nav__profile"><button onClick={handleDelete}>Профиль</button></div>
            <select name="select">
                <option value="value1" disabled selected>Сортировать по</option>
                <option value="Course">Курс</option>
                <option value="Date" >Дата</option>
            </select>
            <select name="select">
                <option value="value1" disabled selected>Категория</option>
                <option value="Общее">Общее</option>
                <option value="Предметы" >Предметы</option>
                <option value="Вопросы">Вопросы</option>
            </select>
            {popup === 'nav__add-popup' && <Popup handlePopup={handlePopup} />}
            <button className={popup} handlePopup = {handlePopupon} onClick={handlePopup}>Добавить пост</button>
        </>
    )
}
export default Nav;