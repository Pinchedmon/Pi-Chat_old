import React from 'react'
import { useQuery } from 'react-query'
import { setSort, setCategory } from '../../../../../../state/navReducer'
import { IfilterModal } from '../../types/filterModal.interface'
import { filterCategory } from './utils/filterCategory'
import { filterSort } from './utils/filterSort'

export default function FilterModal(props: IfilterModal) {
  const { category, sort, dispatch } = props
  const { refetch } = useQuery('myPosts')
  return (
    <div className='w-full flex-col '>
      <div className='flex justify-center'>
        <p className='text-2xl text-green-600 font-bold mt-12px'>Сортировка</p>
      </div>
      <div className='flex p-16px justify-center'>
        <select
          defaultValue={sort}
          onChange={(e) => {
            filterSort(e, dispatch, setSort)
            refetch()
          }}
          className=' text-md  font-bold md:text-lg text-green-600'
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
          onChange={(e) => {
            filterCategory(e, dispatch, setCategory)
            refetch()
          }}
          className='text-md ml-32px font-bold md:text-lg text-green-600  '
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
