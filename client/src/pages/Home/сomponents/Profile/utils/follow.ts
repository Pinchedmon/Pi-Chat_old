import axios from 'axios'
export const follow = (name: string, object: string, refetch: () => void) => {
  axios.post(`http://localhost:6060/follow/follow?name=${name}&object=${object}`).then((res: any) => {
    if (res.status === 200) {
      refetch()
    }
  })
}
