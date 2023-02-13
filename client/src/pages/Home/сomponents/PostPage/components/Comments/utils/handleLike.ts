import axios from 'axios'

export const handleLike = (ID: number, name: string, refetch: (id: number, likes: number) => void) => {
  axios.put(`http://localhost:6060/comment/?ID=${ID}&profileName=${name}`).then((response: any) => {
    if (response.status === 200) {
      refetch(ID, response.data.likes)
    }
  })
}
