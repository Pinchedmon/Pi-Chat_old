import { NavigateFunction } from 'react-router-dom'
import { Ipost } from './posts.interface'

export interface IaddPostSubmit {
  name: string
  text: string
  course: string
  category: string
  file: FileList | null
  refetch: (id: Ipost) => void
  navigate: NavigateFunction
}
