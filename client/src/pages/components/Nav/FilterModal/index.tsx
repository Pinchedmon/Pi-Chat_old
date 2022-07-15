import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import React from 'react'
import { setSort, setCategory } from '../../../../state/navReducer'

interface IFilterModal {
  sort: string | number
  category: string
  dispatch: (arg0: any) => void
  handlePopup: () => void
}
export default function FilterModal(props: IFilterModal) {
  const { category, sort, dispatch, handlePopup } = props
  const filterCategory = (
    e: React.ChangeEvent<HTMLSelectElement>,
    dispatch: (arg0: any) => void,
    setCategory: ActionCreatorWithPayload<string, string>,
  ) => {
    dispatch(setCategory(e.target.value))
  }
  const filterSort = (
    e: React.ChangeEvent<HTMLSelectElement>,
    dispatch: (arg0: any) => void,
    setSort: ActionCreatorWithPayload<string | number, string>,
  ) => {
    dispatch(setSort(e.target.value))
  }
  return (
    <div className='absolute flex flex-row left-1/2 top-24 md:top-10 -translate-x-1/2 '>
      <select
        defaultValue={sort}
        onChange={(e) => filterSort(e, dispatch, setSort)}
        className='mr-8 text-sm  md:text-lg  text-gray-500 hover:text-gray-900'
      >
        <option value='value1' disabled>
          Сортировать по
        </option>
        <option value='1'>1 Курс</option>
        <option value='2'>2 Курс</option>
        <option value='3'>3 Курс</option>
        <option value='4'>4 Курс</option>
        <option value='Late'>Последнее</option>
      </select>
      <select
        defaultValue={category}
        onChange={(e) => filterCategory(e, dispatch, setCategory)}
        className='mr-8 text-sm md:text-lg  text-gray-500 hover:text-gray-900'
      >
        <option value='value1' disabled>
          Категория
        </option>
        <option value='Общее'>Общее</option>
        <option value='Предметы'>Предметы</option>
        <option value='Вопросы'>Вопросы</option>
      </select>
      <button
        onClick={handlePopup}
        className=' text-sm  md:text-lg text-gray-500 hover:text-gray-900'
        aria-hidden='false'
      >
        Добавить пост
      </button>
    </div>
  )
}
