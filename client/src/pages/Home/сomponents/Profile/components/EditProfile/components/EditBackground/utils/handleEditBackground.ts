import axios from 'axios'
export const handleEditBackground = async (
  e: React.SyntheticEvent<HTMLInputElement, Event>,
  refetch: () => void,
  refetchUser: () => void,
  backImg: string,
  name: string,
) => {
  const target = e.target as HTMLInputElement
  const data = new FormData()
  data.append('backImg', target.files[0])
  await axios.put(`http://localhost:6060/profile/backImg?name=${name}`, data).then((res) => {
    backImg = res.data.data
    if (res.status === 200) {
      refetch()
      refetchUser()
    }
  })
}
