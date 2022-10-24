import React, { useContext, useEffect, useState } from 'react'
import { PaperClipIcon } from '@heroicons/react/outline'
import TextareaAutosize from 'react-textarea-autosize'
import { useQuery } from 'react-query'
import { addPostSubmit } from './utils/addPostSubmit'
import { handleCourseChange } from './utils/handleCourseChange'
import { handleCategoryChange } from './utils/handleCategoryChange'
import { handleTextChange } from './utils/handleTextChange'
import { handleChangeFile } from './utils/handleChangeFIle'
import { UserContext } from '../../../../../../App'
import { useNavigate } from 'react-router-dom'
import { IaddPost } from '../../../Nav/types/addPost.interface'

const AddPost = () => {
  const { refetch } = useQuery('myPosts')
  const user = useContext(UserContext)
  const navigate = useNavigate()
  const [addPost, setAddPost] = useState<IaddPost>({
    file: null,
    preview: '',
    validForm: false,
    category: 'Общее',
    course: '1',
    text: '',
    textError: 'поле не может быть пустым',
  })
  useEffect(() => {
    if (addPost.textError && addPost.file === null) {
      setAddPost({ ...addPost, validForm: false })
    } else {
      setAddPost({ ...addPost, validForm: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addPost.file, addPost.textError])
  useEffect(() => {
    if (addPost.file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAddPost((addPost) => ({ ...addPost, preview: reader.result as string }))
      }
      reader.readAsDataURL(addPost.file[0])
    } else {
      setAddPost((addPost) => ({ ...addPost, preview: null }))
    }
  }, [addPost.file])
  return (
    <form
      className=' text-center flex flex-col bg-white p-16px border-b-2  border-gray-300   '
      onSubmit={(e) => {
        addPostSubmit(e, {
          name: user.name,
          text: addPost.text,
          category: addPost.category,
          course: addPost.course,
          file: addPost.file,
          refetch,
          navigate,
        })
        setAddPost({ ...addPost, text: '' })
      }}
    >
      {/* Title naming */}
      <div className='text-2xl font-bold text-left ml-4px mb-4px text-green-600'>За / π / ши</div>
      {/* Text Area */}
      <TextareaAutosize
        cacheMeasurements
        onChange={(e) => handleTextChange(e, setAddPost, addPost)}
        value={addPost.text}
        className='mb-10px text-green-700 border-3 rounded-2xl resize-none outline-none p-10px'
        placeholder='Текст поста'
      />
      <div className='flex'>
        {/* Add file button */}
        <label className='flex '>
          <input
            type='file'
            className='hidden'
            accept='.png,.gif,.jpg,.jpeg'
            onChange={(e) => handleChangeFile(e, setAddPost, addPost)}
          />
          {/* icon */}
          <i className=''>
            <PaperClipIcon className='w-40px text-white bg-green-600 p-6px rounded-xl' />
          </i>
          {/* Img that u want to send */}
          {addPost.file !== null && (
            <img className='h-40px object-cover ml-40px rounded-md' alt='загружается' src={addPost.preview} />
          )}
        </label>
        <div className='flex w-full justify-around items-center '>
          {/* Category */}
          <div className='w-100px text-lg  flex  font-bold '>
            <h4 className='mr-4px'> Категория</h4>
            <select
              className='border-2 text-green-600 rounded-lg block '
              value={addPost.category}
              onChange={(e) => handleCategoryChange(e, setAddPost, addPost)}
            >
              <option value='value1' disabled>
                Категория
              </option>
              <option value='Общее'>Общее</option>
              <option value='Предметы'>Предметы</option>
              <option value='Вопросы'>Вопросы</option>
            </select>
          </div>
          {/* Course | Sort */}
          <div className='w-100px text-lg  flex  font-bold '>
            <h4 className='mr-4px'> Курс</h4>
            <select
              className='border-2 text-green-600 rounded-lg w-54px '
              value={addPost.course}
              onChange={(e) => handleCourseChange(e, setAddPost, addPost)}
            >
              <option disabled>Курс</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
            </select>
          </div>
        </div>
        <button
          disabled={!addPost.validForm}
          className='ml-auto bg-green-600 text-white pt-6px  pb-6px pl-16px pr-16px rounded-xl'
        >
          Отправить
        </button>
      </div>
    </form>
  )
}
export default AddPost
