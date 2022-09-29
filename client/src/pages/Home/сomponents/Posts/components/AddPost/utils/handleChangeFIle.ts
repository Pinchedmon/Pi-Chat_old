type IaddPost = {
  file: FileList | null
  preview: string
  validForm: boolean
  category: string
  course: string
  text: string
  textError: string
}
export const handleChangeFile = (
  e: React.SyntheticEvent<HTMLInputElement, Event>,
  setAddPost: (addPost: IaddPost) => void,
  addPost: IaddPost,
) => {
  const result = (e.target as HTMLInputElement).files
  setAddPost({ ...addPost, file: result })
}
