import axios from 'axios'
export const handleSubmit = (
  value: string,
  name: string,
  username: string,
  refetch: () => void,
  refetchUser: () => void,
) => {
  axios.put(`http://localhost:6060/profile/name?username=${value.toString()}&name=${name}`).then((res) => {
    if (res.status === 200) {
      username = value
      refetch()
      refetchUser()
    }
  })
}
