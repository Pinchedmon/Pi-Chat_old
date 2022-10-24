import axios from 'axios'

export const unFollow = async (name: string, username: string, refetch: () => void) => {
  await axios
    .delete(`http://localhost:6060/follow/unfollow?name=${name}&object=${username}`)
    .then((res) => res.status === 200 && refetch())
  refetch()
}
