import { IaddPost } from '../../../types/addPost.interface'

export const handleChangeFile = (
  e: React.SyntheticEvent<HTMLInputElement, Event>,
  setAddPost: (addPost: IaddPost) => void,
  addPost: IaddPost,
) => {
  const result = (e.target as unknown as HTMLInputElement).files
  setAddPost({ ...addPost, file: result })
}
