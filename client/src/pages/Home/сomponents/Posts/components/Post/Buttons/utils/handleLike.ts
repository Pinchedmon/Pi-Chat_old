import axios from 'axios'

export const handleLike = (ID: number, name: string, refetch: () => void) => {
  axios.put(`http://localhost:6060/posts/feed?postId=${ID}&profileName=${name}`).then((response) => {
    if (response.status === 200) {
      refetch()
    }
  })
}
