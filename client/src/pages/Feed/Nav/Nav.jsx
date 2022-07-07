import { setCategory, setSort, setAddPostStyle } from "./../../components/states/navReducer";
import { DeletePost } from './../../components/deletePost'
import AddPost from './../AddPostBtn/AddPost'
import { useSelector } from "react-redux";
import { filterSort, filterCategory } from "../../components/navFilter";
const Nav = (props) => {
    const { category, sort, dispatch } = props;
    // Кнопка добавления addPost
    const style = useSelector(state => state.nav.addPostStyle)
    const handlePopup = () => {
        if (style === 'nav__add-popup') { dispatch(setAddPostStyle('nav__add')) } else {
            dispatch(setAddPostStyle('nav__add-popup'));
        }
    }
    return (
        <>
            <div className="nav__logo"><button onClick={() => DeletePost(dispatch)}>/ π - Чат /</button></div>
            <div className="nav__profile"><button >Профиль</button></div>
            <select value={sort} onChange={(e) => filterSort(e, dispatch, setSort, sort, category)}>
                <option value="value1" disabled>Сортировать по</option>
                <option value="1">1 Курс</option>
                <option value="2">2 Курс</option>
                <option value="3">3 Курс</option>
                <option value="4">4 Курс</option>
                <option value="Late" >Последнее</option>
            </select>
            <select value={category} onChange={(e) => filterCategory(e, dispatch, setCategory, sort, category)}>
                <option value="value1" disabled >Категория</option>
                <option value="Общее">Общее</option>
                <option value="Предметы" >Предметы</option>
                <option value="Вопросы">Вопросы</option>
            </select>
            {style === 'nav__add-popup' && <AddPost handlePopup={handlePopup} dispatch={dispatch} />}
            <button className={style} onClick={handlePopup}>Добавить пост</button>
        </>
    )

}

export default Nav;