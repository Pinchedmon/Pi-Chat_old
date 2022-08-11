import React, { useEffect, useState } from 'react'
import { PaperClipIcon, XIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { FormEvent } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { useQuery } from 'react-query'
import { getPosts } from '../../../api/getPosts'
import { useSelector } from 'react-redux'
import useAuth from '../../../hooks/useAuth'
interface IaddPost {
  handlePopup: () => void
}
interface IAddPostSubmit {
  name: string
  text: string
  course: string
  path: string
  category: string
  handlePopup: () => void
  file: File
  refetch: () => void
}
function addPostSubmit(event: FormEvent<HTMLFormElement>, props: IAddPostSubmit) {
  let data = new FormData()
  data.append('post', props.file)
  if (props.text !== '' && props.category !== '' && props.course !== '') {
    axios
      .post(
        `http://localhost:6060/posts/feed?author=${props.name}&text=${props.text}&course=${props.course}&category=${props.category}&userImg=${props.path}`,
        data,
      )
      .then((response) => {
        if (response.status === 200) {
          props.refetch()
        }
      })
    props.handlePopup()
    event.preventDefault()
  } else {
    window.alert('Какое-то поле незаполнено!')
    event.preventDefault()
  }
}
interface IState {
  nav: {
    sort: string | number
    category: string
  }
}
const AddPost = (props: IaddPost) => {
  const sort = useSelector((state: IState) => state.nav.sort)
  const category = useSelector((state: IState) => state.nav.category)
  const { refetch } = useQuery('posts', () => getPosts({ sort, category }))
  const { user } = useAuth()
  const path = user.user.pathImg
  const name = user.user.name
  const { handlePopup } = props

  const [addPost, setAddPost] = useState({
    file: null,
    preview: '',
    validForm: false,
    category: 'Общее',
    course: '1',
    text: '',
    textError: 'Пустое поле ввода',
  })
  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setAddPost((addPost) => ({ ...addPost, course: e.target.value }))
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setAddPost((addPost) => ({ ...addPost, category: e.target.value }))
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAddPost((addPost) => ({ ...addPost, text: e.target.value }))
    if (!e.target.value) {
      setAddPost((addPost) => ({ ...addPost, textError: 'Имя не может быть пустым' }))
    } else {
      setAddPost((addPost) => ({ ...addPost, textError: '' }))
    }
  }
  const handleChangeFile = (e: React.SyntheticEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement
    setAddPost((addPost) => ({ ...addPost, file: target.files[0] }))
  }
  useEffect(() => {
    if (addPost.textError && addPost.file === null) {
      setAddPost((addPost) => ({ ...addPost, validForm: false }))
    } else {
      setAddPost((addPost) => ({ ...addPost, validForm: true }))
    }
  }, [addPost.file, addPost.textError])
  useEffect(() => {
    if (addPost.file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAddPost((addPost) => ({ ...addPost, preview: reader.result as string }))
      }
      reader.readAsDataURL(addPost.file)
    } else {
      setAddPost((addPost) => ({ ...addPost, preview: null }))
    }
  }, [addPost.file])
  return (
    <div className='absolute w-2/4 top-0px bg-gray-300 h-screen'>
      <div>
        <div className='flex flex-col justify-center  items-center'>
          <XIcon
            onClick={handlePopup}
            className='ml-auto  h-32px w-32px bg-white-600 text-black hover:text-red-600 cursor-pointer '
          />
          <form
            className=' text-center flex flex-col pb-16px'
            onSubmit={(e) =>
              addPostSubmit(e, {
                name,
                text: addPost.text,
                category: addPost.category,
                course: addPost.course,
                path,
                handlePopup,
                file: addPost.file,
                refetch,
              })
            }
          >
            <h1 className='text-2xl  ml-auto mr-auto md:w-full rounded-md p-10px font-bold bg-green-600 text-white border-3 border-green-600 '>
              Создание поста
            </h1>
            <div className='flex flex-row justify-evenly  mt-12px'>
              <h4 className='text-lg  text-green-600  mt-3'> Категория</h4>
              <h4 className='text-lg  text-green-600 mt-3'> Курс</h4>
            </div>
            <div className='flex flex-row  mt-10px mb-32px justify-evenly'>
              <select
                className='border-2 text-green-600 text-sm rounded-lg block '
                value={addPost.category}
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
                className='border-2 text-green-600 text-sm rounded-lg w-54px '
                value={addPost.course}
                onChange={handleCourseChange}
              >
                <option disabled>Курс</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
              </select>
            </div>
            <TextareaAutosize
              cacheMeasurements
              onChange={handleTextChange}
              value={addPost.text}
              className=' w-260px md:w-300px mb-10px text-green-700 border-3 rounded-2xl resize-none outline-none p-10px'
              placeholder='Текст поста'
            />
            <div className='flex'>
              <label className='flex '>
                <input
                  type='file'
                  className='hidden'
                  accept='.png,.gif,.jpg,.jpeg'
                  onChange={(e) => handleChangeFile(e)}
                />
                <i className=''>
                  <PaperClipIcon className='w-40px text-white bg-green-600 p-6px rounded-xl' />
                </i>
                {addPost.file !== null && (
                  <img className='h-40px object-cover ml-40px rounded-md' alt='загружается' src={addPost.preview} />
                )}
              </label>
              <button
                disabled={!addPost.validForm}
                className='ml-auto mr-10px bg-green-600 text-white pt-6px  pb-6px pl-16px pr-16px rounded-xl'
              >
                Отправить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default AddPost
