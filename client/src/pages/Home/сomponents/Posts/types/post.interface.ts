export interface Iinfo {
  img: string
  text: string
}
export interface Ibuttons {
  refetch: () => void
  name: string
  role: string
  ID: number
  likes: number | string
  comments: number | string
}
export interface Ioptions {
  id: number
  refetch: () => void
}

export interface IprofileInfo {
  username: string
  name: string
  date: any
}
export interface IuserImg {
  name: string
  userImg: string
}

export interface Ioption {
  showOptions: boolean
  showWarning: boolean
}
