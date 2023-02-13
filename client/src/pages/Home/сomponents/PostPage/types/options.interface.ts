export interface Ioptions {
  id: number
  postId: number
  refetch: (id: number) => void
  commentId?: number
}
export interface Ioption {
  showWarning: boolean
  showOptions: boolean
}
