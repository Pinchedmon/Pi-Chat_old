import React, { useEffect, useState } from 'react'
import { PaperClipIcon } from '@heroicons/react/outline'
import redaxios from 'redaxios'
import { FormEvent } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { useQuery } from 'react-query'
import { getPosts } from '../../../api/getPosts'
import { useSelector } from 'react-redux'
import useAuth from '../../../hooks/useAuth'
import { ArrowLeftIcon } from '@heroicons/react/solid'
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
  const path = user.pathImg
  const name = user.name
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
  function addPostSubmit(event: FormEvent<HTMLFormElement>, props: IAddPostSubmit) {
    let data = new FormData()
    data.append('post', props.file)
    if (props.text !== '' && props.category !== '' && props.course !== '') {
      redaxios
        .post(
          `http://localhost:6060/posts/feed?author=${props.name}&name=${user.username}&text=${props.text}&course=${props.course}&category=${props.category}&userImg=${props.path}`,
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
  return (
    <div className='absolute w-full top-0px backdrop-blur-sm h-screen'>
      <div className='mt-100px'>
        <div className='flex flex-col justify-center items-center'>
          <form
            className=' text-center flex flex-col bg-white p-16px w-90% border-1 rounded-3xl border-2   shadow-2xl'
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
            <div className='flex h-54px items-center text-green-600 rounded-2xl '>
              <ArrowLeftIcon
                onClick={handlePopup}
                className='w-48px  rounded-md bg-gray-100 p-6px  hover:text-red-700'
              />
              <h1 className='absolute left-1/2 -translate-x-1/2 text-2xl  rounded-xl p-10px font-bold  '>
                Создание поста
              </h1>
            </div>
            <div className='flex justify-evenly items-center mt-12px mb-16px'>
              <div className='w-100px text-lg  flex  font-bold '>
                <h4 className='mr-4px'> Категория</h4>
                <select
                  className='border-2 text-green-600 rounded-lg block '
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
              </div>
              <div className='ml-10px text-lg text-left flex  font-bold '>
                <h4 className='mr-4px'> Курс</h4>
                <select
                  className='border-2 text-green-600 rounded-lg w-54px '
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
            </div>
            <TextareaAutosize
              cacheMeasurements
              onChange={handleTextChange}
              value={addPost.text}
              className='mb-10px text-green-700 border-3 rounded-2xl resize-none outline-none p-10px'
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
                className='ml-auto bg-green-600 text-white pt-6px  pb-6px pl-16px pr-16px rounded-xl'
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
