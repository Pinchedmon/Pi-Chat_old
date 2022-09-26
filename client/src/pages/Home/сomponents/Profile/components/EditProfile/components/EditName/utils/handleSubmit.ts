import redaxios from 'redaxios'
export const handleSubmit = (value: string, name: string, username: string, refetch: () => void) => {
  redaxios.put(`http://localhost:6060/profile/name?username=${value.toString()}&name=${name}`).then((res) => {
    if (res.status === 200) {
      username = value
      refetch()
    }
  })
}
