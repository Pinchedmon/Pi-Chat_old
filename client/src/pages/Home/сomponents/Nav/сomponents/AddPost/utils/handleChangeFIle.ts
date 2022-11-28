import { ChangeEvent } from 'react'
import { IaddPost } from '../../../types/addPost.interface'

export const handleChangeFile = (
  e: ChangeEvent<HTMLTextAreaElement>,
  setAddPost: (addPost: IaddPost) => void,
  addPost: IaddPost,
) => {
  const result = (e.target as unknown as HTMLInputElement).files
  setAddPost({ ...addPost, file: result })
}
