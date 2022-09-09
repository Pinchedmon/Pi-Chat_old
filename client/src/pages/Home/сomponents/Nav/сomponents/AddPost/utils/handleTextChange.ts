export const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>, setAddPost: (addPost: any) => void) => {
  setAddPost((addPost: any) => ({ ...addPost, text: e.target.value }))
  if (!e.target.value) {
    setAddPost((addPost: any) => ({ ...addPost, textError: 'Имя не может быть пустым' }))
  } else {
    setAddPost((addPost: any) => ({ ...addPost, textError: '' }))
  }
}
