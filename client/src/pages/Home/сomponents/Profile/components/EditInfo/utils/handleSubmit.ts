import redaxios from 'redaxios'
export const handleSubmit = (text: string, name: string, refetch: () => void, info: string) => {
  redaxios.put(`http://localhost:6060/profile/info?text=${text}&name=${name}`).then((res) => {
    if (res.status === 200) {
      refetch()
      info = text
    }
  })
}
