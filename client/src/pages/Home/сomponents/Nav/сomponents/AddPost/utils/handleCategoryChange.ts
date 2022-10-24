import { IaddPost } from '../../../types/addPost.interface'

export const handleCategoryChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  setAddPost: (addPost: IaddPost) => void,
  addPost: IaddPost,
) => {
  setAddPost({ ...addPost, category: e.target.value })
}
