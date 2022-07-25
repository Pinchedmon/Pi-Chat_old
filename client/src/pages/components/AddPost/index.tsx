import React, { useEffect, useState } from 'react'
import { PaperClipIcon, XIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { FormEvent } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { useQuery } from 'react-query'
import { getPosts } from '../../../api/getPosts'
import { useSelector } from 'react-redux'
import useAuth from '../../../hooks/useAuth'
interface IAddPost {
  handlePopup: () => void
}
interface IAddPostSubmit {
  name: string
  text: string
  course: string
  path: string
  addCategory: string
  handlePopup: () => void
  file: File
  refetch: () => void
}
function addPostSubmit(event: FormEvent<HTMLFormElement>, props: IAddPostSubmit) {
  let data = new FormData()
  data.append('post', props.file)
  if (props.text !== '' && props.addCategory !== '' && props.course !== '') {
    axios.post(
      `http://localhost:6060/feed?author=${props.name}&text=${props.text}&course=${props.course}&category=${props.addCategory}&userImg=${props.path}`,
      data,
    )
    props.handlePopup()
    event.preventDefault()
    setTimeout(() => {
      props.refetch()
    }, 1000)
  } else {
    window.alert('Какое-то поле незаполнено!')
    event.preventDefault()
    setTimeout(() => {
      props.refetch()
    }, 1000)
  }
}
const AddPost = (props: IAddPost) => {
  // @ts-ignore
  const sort = useSelector((state) => state.nav.sort)
  // @ts-ignore
  const category = useSelector((state) => state.nav.category)
  const { refetch } = useQuery('posts', () => getPosts({ sort, category }))
  const { user } = useAuth()
  const name = user.user.name
  const { handlePopup } = props
  const [file, setFile] = useState(null)
  const path = user.user.img
  const [preview, setPreview] = useState<string>()
  const [validForm, setValidForm] = useState(false)
  const [addCategory, setAddCategory] = useState('Общее')
  const [course, setCourse] = useState('1')
  const [text, setText] = useState('')
  const [textError, setTextError] = useState('пустое поле ввода')
  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => setCourse(e.target.value)
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => setAddCategory(e.target.value)
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    if (!e.target.value) {
      setTextError('Имя не может быть пустым')
    } else {
      setTextError('')
    }
  }
  const handleChangeFile = (e: React.SyntheticEvent<any, Event>) => {
    const target = e.target as HTMLInputElement
    setFile(target.files[0])
  }
  useEffect(() => {
    if (textError && file === null) {
      setValidForm(false)
    } else {
      setValidForm(true)
    }
  }, [file, textError])
  useEffect(() => {
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }, [file])
  return (
    <div>
      <div className=' fixed mt-90px left-1/2 transition -translate-x-1/2 w-90% md:max-w-3xl border-3 border-green-700  bg-white rounded-lg'>
        <div className='flex flex-col justify-center  items-center'>
          <XIcon
            onClick={handlePopup}
            className='ml-auto  h-32px w-32px bg-white-600 text-black hover:text-red-600 cursor-pointer '
          />
          <form
            className=' text-center flex flex-col pb-16px'
            onSubmit={(e) => addPostSubmit(e, { name, text, addCategory, course, path, handlePopup, file, refetch })}
          >
            <h1 className='text-2xl w-200px ml-auto mr-auto md:w-full rounded-md p-10px font-bold bg-green-600 text-white border-3 border-green-600 '>
              Создание поста
            </h1>
            <div className='flex flex-row justify-evenly  mt-12px'>
              <h4 className='text-lg  text-green-600  mt-3'> Категория</h4>
              <h4 className='text-lg  text-green-600 mt-3'> Курс</h4>
            </div>
            <div className='flex flex-row  mt-10px mb-32px justify-evenly'>
              <select
                className='border-2 text-green-600 text-sm rounded-lg block '
                value={addCategory}
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
            <TextareaAutosize
              cacheMeasurements
              onChange={handleTextChange}
              value={text}
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
                {file !== null && (
                  <img className='h-40px object-cover ml-40px rounded-md' alt='загружается' src={preview} />
                )}
              </label>
              <button
                disabled={!validForm}
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
