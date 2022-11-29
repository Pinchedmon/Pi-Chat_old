import React from 'react'
import { setSort, setCategory } from '../../../../../../state/navReducer'
import { IfilterModal } from '../../types/filterModal.interface'
import CategorySelect from './CategorySelect'
import SortSelect from './SortSelect'
import { filterCategory } from './utils/filterCategory'
import { filterSort } from './utils/filterSort'

const FilterModal = (props: IfilterModal) => {
  const { category, sort, dispatch } = props
  return (
    <div className='filterModal'>
      <p className='filterModal__title'>Сортировка</p>
      <div className='filterModal__filters'>
        <SortSelect sort={sort} filterSort={(e) => filterSort(e, dispatch, setSort)} />/
        <CategorySelect category={category} filterCategory={(e) => filterCategory(e, dispatch, setCategory)} />
      </div>
    </div>
  )
}
export default FilterModal
