import React, { useContext, useEffect, useState } from 'react'
import { PaperClipIcon } from '@heroicons/react/outline'
import TextareaAutosize from 'react-textarea-autosize'
import { addPostSubmit } from './utils/addPostSubmit'
import { handleCourseChange } from './utils/handleCourseChange'
import { handleCategoryChange } from './utils/handleCategoryChange'
import { handleTextChange } from './utils/handleTextChange'
import { handleChangeFile } from './utils/handleChangeFIle'
import { UserContext } from '../../../../../../App'
import { useNavigate } from 'react-router-dom'
import { IaddPost } from '../../../Nav/types/addPost.interface'
import { Ipost } from '../../types/posts.interface'

const AddPost = (props: { refetch: (id: Ipost) => void }) => {
  const { refetch } = props
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
    <>
      <form
        className='addPost'
        onSubmit={(e) => {
          addPostSubmit(e, {
            name: user.name,
            text: addPost.text,
            category: addPost.category,
            course: addPost.course,
            file: addPost.file,
            refetch: refetch,
            navigate,
          })
          setAddPost({ ...addPost, text: '' })
        }}
      >
        <div className='addPost__title'>За / π / ши</div>

        <TextareaAutosize
          cacheMeasurements
          onChange={(e) => handleTextChange(e, setAddPost, addPost)}
          value={addPost.text}
          className='addPost__textarea'
          placeholder='Текст поста'
          style={{}}
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
              <PaperClipIcon className='addPost__file__icon' />
            </i>
            {addPost.file !== null && <img className='addPost__file__img' alt='загружается' src={addPost.preview} />}
          </label>
          <div className='addPost__filter-area '>
            <div className='addPost-filter'>
              <p className='addPost-filter__naming'> Категория</p>
              <select
                className='addPost-filter__select'
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
            <div className='addPost-filter'>
              <p className='addPost-filter__naming'> Курс</p>
              <select
                className='addPost-filter__select '
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
    </>
  )
}
export default AddPost
