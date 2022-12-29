import axios from 'axios'

export const handleLikePosts = (ID: number, name: string, refetchLike: (id: number, likes: number) => void) => {
  axios.put(`http://localhost:6060/posts/feed?postId=${ID}&profileName=${name}`).then((response: any) => {
    if (response.status === 200) {
      refetchLike(ID, response.data.likes)
    }
  })
}
