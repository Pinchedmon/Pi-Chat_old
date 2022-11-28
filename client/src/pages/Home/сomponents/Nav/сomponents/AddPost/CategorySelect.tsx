import React from 'react'
export interface IcategorySelect {
  category: string | number
  handleCategoryChange: (e: any) => void
}
const CategorySelect = (props: IcategorySelect) => {
  const { category, handleCategoryChange } = props
  return (
    <>
      <div className='nav__addPost-filter'>
        <h4> Категория</h4>
        <select className='nav__addPost__select' value={category} onChange={handleCategoryChange}>
          <option value='value1' disabled>
            Категория
          </option>
          <option value='Общее'>Общее</option>
          <option value='Предметы'>Предметы</option>
          <option value='Вопросы'>Вопросы</option>
        </select>
      </div>
    </>
  )
}

export default CategorySelect
