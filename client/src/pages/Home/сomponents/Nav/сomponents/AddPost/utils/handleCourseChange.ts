import { IaddPost } from '../../../types/addPost.interface'

export const handleCourseChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  setAddPost: (addPost: IaddPost) => void,
  addPost: IaddPost,
) => {
  setAddPost({ ...addPost, course: e.target.value })
}
