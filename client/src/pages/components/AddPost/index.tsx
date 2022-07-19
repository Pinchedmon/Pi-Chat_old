import React, { useState } from 'react'
import { XIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
interface IAddPost {
  handlePopup: () => void
}
interface IAddPostSubmit {
  text: string
  course: string
  category: string
  handlePopup: () => void
  navigate: (arg0: string) => void
}
function addPostSubmit(
  event: FormEvent<HTMLFormElement>,
  { text, category, course, handlePopup, navigate }: IAddPostSubmit,
) {
  let user: any

  if (localStorage['user']) {
    user = JSON.parse(localStorage.getItem('user') || '')
  }
  if (text !== '' && category !== '' && course !== '') {
    axios.post('http://localhost:6060/feed', {
      author: user.user.name,
      text: text,
      course: course,
      category: category,
    })
    handlePopup()
    event.preventDefault()
    navigate('/')
  } else {
    window.alert('Какое-то поле незаполнено!')
    event.preventDefault()
  }
}
const AddPost = (props: IAddPost) => {
  let navigate = useNavigate()
  const { handlePopup } = props
  const [category, setCategory] = useState('Общее')
  const [course, setCourse] = useState('1')
  const [text, setText] = useState('')
  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => setCourse(e.target.value)
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)

  return (
    <div className='popup flex justify-center items-center '>
      <div className='absolute w-310px md:w-361px  bg-green-600 text-green-300 rounded-lg'>
        <button
          onClick={handlePopup}
          className=' rounded-md p-2px flex items-center float-right justify-center text-white   hover:text-red-600 hover:bg-gray-100'
        >
          <XIcon className='h-32px w-32px bg-white-600' />
        </button>
        <form
          className='w-100% text-center flex flex-col mt-10'
          onSubmit={(e) => addPostSubmit(e, { text, category, course, handlePopup, navigate })}
        >
          <h1 className='text-2xl ml-40px mt-40px rounded-md p-10px font-bold bg-green-700 text-green-300'>
            Создание поста
          </h1>
          <div className='flex flex-row justify-evenly ml-40px mt-12px'>
            <h4 className='text-lg bg-green-600 text-green-300 mr-10px mt-3'> Категория</h4>
            <h4 className='text-lg bg-green-600 text-green-300 mt-3'> Курс</h4>
          </div>
          <div className='flex flex-row pl-40px mt-10px justify-evenly'>
            <select
              className='bg-green-700 text-green-300ml-8px text-sm rounded-lg block '
              value={category}
              onChange={handleCategoryChange}
            >
              <option value='value1' disabled>
                Категория
              </option>
              <option value='Общее'>Общее</option>
              <option value='Предметы'>Предметы</option>
              <option value='Вопросы'>Вопросы</option>
            </select>

            <select
              className='bg-green-700 text-green-300 text-sm rounded-lg w-54px block ml-10px'
              value={course}
              onChange={handleCourseChange}
            >
              <option disabled>Курс</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
            </select>
          </div>
          <textarea
            className='resize-none w-300px bg-green-200 ml-5px md:ml-32px text-black  rounded-lg mt-16px  p-10px focus:outline-none focus:border-green-700'
            value={text}
            placeholder='Введите текст поста'
            onChange={handleTextChange}
          ></textarea>
          <button className='text-lg ml-40px mt-12px mb-12px  text-white hover:text-green-700'>Добавить пост</button>
        </form>
      </div>
    </div>
  )
}
export default AddPost
