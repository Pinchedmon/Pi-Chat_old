import React, { useContext, useEffect, useState } from 'react'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import { addPostSubmit } from './utils/addPostSubmit'
import { handleCourseChange } from './utils/handleCourseChange'
import { handleCategoryChange } from './utils/handleCategoryChange'
import { handleTextChange } from './utils/handleTextChange'
import { handleChangeFile } from './utils/handleChangeFIle'
import { UserContext } from '../../../../../../App'
import { useNavigate } from 'react-router-dom'
import { IaddPost } from '../../types/addPost.interface'
import TextArea from '../../../../../../components/ux/SendField/components/TextArea'
import SendBtn from '../../../../../../components/ux/SendField/components/SendBtn'
import ChooseFileBtn from '../../../../../../components/ux/SendField/components/ChooseFileBtn'
import CourseSelect from './CourseSelect'
import CategorySelect from './CategorySelect'

const AddPost = (props: { setIsOpen: (item: boolean) => void }) => {
  const { setIsOpen } = props
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
          <CategorySelect
            category={addPost.category}
            handleCategoryChange={(e) => handleCategoryChange(e, setAddPost, addPost)}
          />
          <CourseSelect
            course={addPost.course}
            handleCourseChange={(e) => handleCourseChange(e, setAddPost, addPost)}
          />
        </div>
        <TextArea handleChangeText={(e) => handleTextChange(e, setAddPost, addPost)} value={addPost.text} />
        <div className='flex'>
          <ChooseFileBtn handleChangeFile={(e) => handleChangeFile(e, setAddPost, addPost)} preview={addPost.preview} />
          <SendBtn validForm={addPost.validForm} />
        </div>
      </form>
    </>
  )
}
export default AddPost
