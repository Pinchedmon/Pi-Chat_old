import React from 'react'
import { IcategorySelect } from './CategorySelect.interface'

function CategorySelect(props: IcategorySelect) {
  const { category, filterCategory } = props
  return (
    <>
      <select
        defaultValue={category}
        onChange={(e) => {
          filterCategory(e)
        }}
        className='filterModal__filter'
      >
        <option value='value1' disabled>
          Категория
        </option>
        <option value='Общее'>Общее</option>
        <option value='Предметы'>Предметы</option>
        <option value='Вопросы'>Вопросы</option>
      </select>
    </>
  )
}

export default CategorySelect
