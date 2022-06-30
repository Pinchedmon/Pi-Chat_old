import axios from "axios"
import './Nav.css'
import React, { useState} from "react"
import Popup from "./Popup";
const Nav = (props) => {
   
    const [popup, setPopup] = useState('nav__add');
    const [category, setCategory] = useState('Общее');
    const [sort, setSort] = useState('1');
   
    const handleDelete = () => {
        axios.delete('http://localhost:6060/feed')
    }
    const handlePopup = () => {
        if (popup === 'nav__add-popup') { setPopup('nav__add') } else {
            setPopup('nav__add-popup')
        }
    }
    const handleCategory = (event) => {
        setCategory(event.target.value)
        props.returnCategory(event.target.value)
    }
    const handleSort= (event) => {
        setSort(event.target.value)
        props.returnSort(event.target.value)
        
    }
    return (
        <>
            <div className="nav__logo"><button>/ π - Чат /</button></div>
            <div className="nav__profile"><button onClick={handleDelete}>Профиль</button></div>
            <select  value={sort} onChange={handleSort}>
                <option  value="value1" disabled>Сортировать по</option>
                <option value="1">1 Курс</option>
                <option value="2">2 Курс</option>
                <option value="3">3 Курс</option>
                <option value="4">4 Курс</option>
                <option value="Late" >Последнее</option>
            </select>
            <select value={category} onChange={handleCategory}>
                <option value="value1" disabled >Категория</option>
                <option value="Общее">Общее</option>
                <option value="Предметы" >Предметы</option>
                <option value="Вопросы">Вопросы</option>
            </select>
            {popup === 'nav__add-popup' && <Popup handlePopup={handlePopup} />}
            <button className={popup}  onClick={handlePopup}>Добавить пост</button>
        </>
    )
}
export default Nav;