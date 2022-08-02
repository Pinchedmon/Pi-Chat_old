import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import React from 'react'
import { setSort, setCategory } from '../../../../state/navReducer'

interface IFilterModal {
  sort: string | number
  category: string
  dispatch: (arg0: any) => void
}
export default function FilterModal(props: IFilterModal) {
  const { category, sort, dispatch } = props
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
    <div className='w-full flex-col  bg-green-600 '>
      <div className='flex justify-center'>
        <p className='text-xl text-white font-bold mt-12px'>Сортировка</p>
      </div>
      <div className='flex p-16px justify-center'>
        <select
          defaultValue={sort}
          onChange={(e) => filterSort(e, dispatch, setSort)}
          className=' text-sm  md:text-md bg-green-600 text-white'
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
          className='text-sm ml-32px md:text-md bg-green-600  text-white '
        >
          <option value='value1' disabled>
            Категория
          </option>
          <option value='Общее'>Общее</option>
          <option value='Предметы'>Предметы</option>
          <option value='Вопросы'>Вопросы</option>
        </select>
      </div>
    </div>
  )
}
