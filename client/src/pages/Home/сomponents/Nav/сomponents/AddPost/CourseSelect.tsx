import React from 'react'
export interface IcourseSelect {
  course: string | string
  handleCourseChange: (e: any) => void
}
const CourseSelect = (props: IcourseSelect) => {
  const { course, handleCourseChange } = props
  return (
    <>
      <div className='ml-10px nav__addPost-filter '>
        <h4> Курс</h4>
        <select className='nav__addPost__select' value={course} onChange={handleCourseChange}>
          <option disabled>Курс</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
        </select>
      </div>
    </>
  )
}

export default CourseSelect
