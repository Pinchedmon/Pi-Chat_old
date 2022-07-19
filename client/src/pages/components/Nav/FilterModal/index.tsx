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
    <div className='absolute flex flex-row left-1/2 mt-24px drop-shadow bg-green-600 rounded-xl -translate-x-1/2 '>
      <select
        defaultValue={sort}
        onChange={(e) => filterSort(e, dispatch, setSort)}
        className='w-96px md:w-120px text-sm ml-10px roundred-xl md:text-md bg-green-600 text-white'
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
        className='mr-4px ml-4px text-sm md:text-md bg-green-600  text-white '
      >
        <option value='value1' disabled>
          Категория
        </option>
        <option value='Общее'>Общее</option>
        <option value='Предметы'>Предметы</option>
        <option value='Вопросы'>Вопросы</option>
      </select>
      <button onClick={handlePopup} className=' text-sm  md:text-md text-white pr-8px' aria-hidden='false'>
        Добавить пост
      </button>
    </div>
  )
}
