export interface IAddPost {
  handlePopup: () => void
}
export type IaddPost = {
  file: FileList | null
  preview: string
  validForm: boolean
  category: string
  course: string
  text: string
  textError: string
}
