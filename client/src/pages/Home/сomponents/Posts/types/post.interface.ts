export interface Iinfo {
  img: string
  text: string
}
export interface Ibuttons {
  likePost?: (id: number, likes: number) => void
  likeComment?: (id: number, likes: number) => void
  name: string
  role: string
  ID: number
  likes: number | string
  comments: number | string
  liked: boolean
  postName: string
}
export interface Ioptions {
  id: number
  deletePost: (id: number) => void
}

export interface IprofileInfo {
  username: string
  name: string
  date: any
  onLink: () => void
}
export interface IuserImg {
  name: string
  userImg: string
}

export interface Ioption {
  showOptions: boolean
  showWarning: boolean
}
