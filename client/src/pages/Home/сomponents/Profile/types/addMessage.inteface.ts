export interface IaddMessageSubmit {
  firstName: string
  secondName: string
  text: string
  path: string
  file: File
}

export interface Imessage {
  file: File
  preview: string
  validForm: boolean
  text: string
  textError: string
}
export interface IaddMessage {
  name: string
  setIsOpen: () => void
}
