
const MobileNav = (props) => {
    const { Transition, Fragment, Popover, XIcon, sort, category, setCategory, setSort, filterCategory, filterSort, dispatch, handlePopup  } = props;
    return (<>
     <Transition
                    as={Fragment}
                    enter="duration-200 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                            <div className="pt-5 pb-6 px-5">
                                <div className="flex items-center  text-2xl text-green-600  justify-between">
                                    <div>
                                        / π - Чат /
                                    </div>
                                    <div className="-mr-2">
                                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                                            <span className="sr-only">Close menu</span>
                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                        </Popover.Button>
                                    </div>
                                </div>


                            </div>
                            <div className="py-6 px-5 space-y-6">
                                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                    <select value={sort} onChange={(e) => filterSort(e, dispatch, setSort, sort, category)} className="text-base font-medium text-gray-500 hover:text-gray-900">
                                        <option value="value1" disabled>Сортировать по</option>
                                        <option value="1">1 Курс</option>
                                        <option value="2">2 Курс</option>
                                        <option value="3">3 Курс</option>
                                        <option value="4">4 Курс</option>
                                        <option value="Late" >Последнее</option>
                                    </select>
                                    <select value={category} onChange={(e) => filterCategory(e, dispatch, setCategory, sort, category)} className="text-base font-medium text-gray-500 hover:text-gray-900">
                                        <option value="value1" disabled >Категория</option>
                                        <option value="Общее">Общее</option>
                                        <option value="Предметы" >Предметы</option>
                                        <option value="Вопросы">Вопросы</option>
                                    </select>
                                </div>
                                <Popover.Button className="w-full">
                                <button onClick={handlePopup}  className="text-base font-medium text-gray-500 hover:text-gray-900">Добавить пост</button>
                                </Popover.Button>
                                

                                <div>
                                    <a
                                        href="##"
                                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700"
                                    >
                                         Зарегистрироваться
                                    </a>
                                    <p className="mt-6 text-center text-base font-medium text-gray-500">
                                        Существует аккаунт?{' '}
                                        <a href="##" className="text-green-600 hover:text-green-700">
                                            Войти
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Popover.Panel>
                </Transition> </>)
}
export default MobileNav;