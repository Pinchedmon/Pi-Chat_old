type IaddPost = {
  file: FileList | null
  preview: string
  validForm: boolean
  category: string
  course: string
  text: string
  textError: string
}
export const handleCategoryChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  setAddPost: (addPost: IaddPost) => void,
  addPost: IaddPost,
) => {
  setAddPost({ ...addPost, category: e.target.value })
}
