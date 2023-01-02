import axios from 'axios'

export const handleLike = (ID: number, name: string, refetchLike: (id: number, likes: number) => void) => {
  axios.put(`http://localhost:6060/comment/?ID=${ID}&profileName=${name}`).then((response: any) => {
    if (response.status === 200) {
      refetchLike(ID, response.data.likes)
    }
  })
}
