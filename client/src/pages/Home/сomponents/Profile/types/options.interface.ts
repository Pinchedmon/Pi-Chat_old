export interface Ioptions {
  userName: string
  profileName: string
  refetch: () => void
}

export interface Ioption {
  showOptions: boolean
  showWarning: boolean
  isOpenMsg: boolean
  isOpenEdit: boolean
}
