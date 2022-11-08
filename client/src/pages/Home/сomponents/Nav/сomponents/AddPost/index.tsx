import React, { useContext, useEffect, useState } from 'react'
import { ArrowLeftIcon, PaperClipIcon } from '@heroicons/react/outline'
import TextareaAutosize from 'react-textarea-autosize'
import { useQuery } from 'react-query'
import { addPostSubmit } from './utils/addPostSubmit'
import { handleCourseChange } from './utils/handleCourseChange'
import { handleCategoryChange } from './utils/handleCategoryChange'
import { handleTextChange } from './utils/handleTextChange'
import { handleChangeFile } from './utils/handleChangeFIle'
import { UserContext } from '../../../../../../App'
import { useNavigate } from 'react-router-dom'
import { IaddPost } from '../../types/addPost.interface'

const AddPost = (props: { setIsOpen: (item: boolean) => void }) => {
  const { setIsOpen } = props
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
    <>
      <form
        className='nav__addPost'
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
          setIsOpen(false)
        }}
      >
        <div className='nav__addPost-title'>
          <ArrowLeftIcon onClick={() => setIsOpen(false)} className='nav__addPost-title-icon' />
          <h1 className='nav__addPost-title-text'>Создание поста</h1>
        </div>
        <div className='nav__addPost-filters'>
          <div className='nav__addPost-filter'>
            <h4> Категория</h4>
            <select
              className='nav__addPost__select'
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

          <div className='ml-10px nav__addPost-filter '>
            <h4> Курс</h4>
            <select
              className='nav__addPost__select'
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
        <TextareaAutosize
          cacheMeasurements
          onChange={(e) => handleTextChange(e, setAddPost, addPost)}
          value={addPost.text}
          className='nav__addPost__textarea'
          placeholder='Текст поста'
        />
        <div className='flex'>
          <label className='flex '>
            <input
              type='file'
              className='hidden'
              accept='.png,.gif,.jpg,.jpeg'
              onChange={(e) => handleChangeFile(e, setAddPost, addPost)}
            />
            <i className=''>
              <PaperClipIcon className='nav__addPost__file' />
            </i>
            {addPost.file !== null && <img className='nav__addPost__img' alt='загружается' src={addPost.preview} />}
          </label>
          <button disabled={!addPost.validForm} className='nav__addPost__button'>
            Отправить
          </button>
        </div>
      </form>
    </>
  )
}
export default AddPost
