import React from 'react'
import { IsortSelect } from './SortSelect.interface'

const SortSelect = (props: IsortSelect) => {
  const { sort, filterSort } = props
  return (
    <>
      <select defaultValue={sort} onChange={(e) => filterSort(e)} className='filterModal__filter'>
        <option value='value1' disabled>
          Сортировать по
        </option>
        <option value='1'>1 Курс</option>
        <option value='2'>2 Курс</option>
        <option value='3'>3 Курс</option>
        <option value='4'>4 Курс</option>
        <option value='Late'>Последнее</option>
      </select>
    </>
  )
}

export default SortSelect
