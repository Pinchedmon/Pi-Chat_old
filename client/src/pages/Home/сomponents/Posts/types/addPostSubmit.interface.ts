import { NavigateFunction } from 'react-router-dom'

export interface IaddPostSubmit {
  name: string
  text: string
  course: string
  category: string
  file: FileList | null
  refetch: () => void
  navigate: NavigateFunction
}
