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
  if (!e.target.value) {
    setAddPost({ ...addPost, textError: 'Имя не может быть пустым', text: e.target.value })
  } else {
    setAddPost({ ...addPost, textError: '', text: e.target.value })
  }
}
