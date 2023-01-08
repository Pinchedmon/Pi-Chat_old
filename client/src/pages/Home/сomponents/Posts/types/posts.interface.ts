export type Ipost = {
  userImg: string
  author: string
  text: string
  postImg: string
  likes: number | string
  ID: number
  comments: number | string
}
export interface Iparams {
  sort: string | number
  category: string
  name: string
}
