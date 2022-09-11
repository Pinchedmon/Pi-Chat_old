type IaddPost = {
  file: FileList | null
  preview: string
  validForm: boolean
  category: string
  course: string
  text: string
  textError: string
}
export const handleTextChange = (
  e: React.ChangeEvent<HTMLTextAreaElement>,
  setAddPost: (addPost: IaddPost) => void,
  addPost: IaddPost,
) => {
  setAddPost({ ...addPost, text: e.target.value })
  if (!e.target.value) {
    setAddPost({ ...addPost, textError: 'Имя не может быть пустым' })
  } else {
    setAddPost({ ...addPost, textError: '' })
  }
}
