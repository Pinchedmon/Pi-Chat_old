import { setCategory, setSort, setAddPostStyle } from "./../../components/states/navReducer";
import AddPost from './../AddPostBtn/AddPost'
import './Nav.css'
import { useSelector } from "react-redux";
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { filterSort, filterCategory } from "../../components/navFilter";
import { setText } from "../../components/states/addPostBtnReducer";
import MobileNav from "./MobileNav";
const Nav = (props) => {
    const { category, sort, dispatch } = props;
    const style = useSelector(state => state.nav.addPostStyle)
    const handlePopup = () => {
        dispatch(setText(''));
        dispatch(setAddPostStyle(!style))
    }

    return (
        <>
            <Popover className="relative bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start">
                        <div className="flex justify-start text-2xl text-green-600 lg:w-0 lg:flex-1">
                            / π - Чат /
                        </div>
                        <div className="-mr-2 -my-2 md:hidden">
                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                                <MenuIcon className="h-6 w-6"/>
                            </Popover.Button>
                        </div>
                        <Popover.Group as="nav" className="hidden md:flex ">
                            <select  value={sort} onChange={(e) => filterSort(e, dispatch, setSort, sort, category)} className="text-base mr-8 before:font-medium text-gray-500 hover:text-gray-900">
                                <option value="value1" disabled>Сортировать по</option>
                                <option value="1">1 Курс</option>
                                <option value="2">2 Курс</option>
                                <option value="3">3 Курс</option>
                                <option value="4">4 Курс</option>
                                <option value="Late" >Последнее</option>
                            </select>
                            <select  value={category} onChange={(e) => filterCategory(e, dispatch, setCategory, sort, category)} className="text-base mr-8 font-medium text-gray-500 hover:text-gray-900">
                                <option value="value1" disabled >Категория</option>
                                <option value="Общее">Общее</option>
                                <option value="Предметы" >Предметы</option>
                                <option value="Вопросы">Вопросы</option>
                            </select>
                      
                            <button onClick={handlePopup} className="text-base w-full font-medium text-gray-500 hover:text-gray-900" aria-hidden="false">Добавить пост</button>
                           
                        </Popover.Group>
                        {style && <AddPost handlePopup={handlePopup} dispatch={dispatch} />}
                        <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                            <a href="##" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                                Логин
                            </a>
                            <a
                                href="##"
                                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700"
                            >
                                Регистрация
                            </a>
                        </div>
                    </div>
                </div>
                <MobileNav
                    Transition={Transition}
                    XIcon={XIcon}
                    Fragment={Fragment}
                    Popover={Popover}
                    sort={sort}
                    category={category}
                    filterSort={filterSort}
                    filterCategory={filterCategory}
                    setSort={setSort}
                    setCategort={setCategory}
                    dispatch={dispatch}
                    handlePopup={handlePopup} />
            </Popover>

        </>
    )

}

export default Nav;