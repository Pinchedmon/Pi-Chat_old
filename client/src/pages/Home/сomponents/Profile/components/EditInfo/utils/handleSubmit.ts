import redaxios from 'redaxios'
export const handleSubmit = (text: string, name: string, refetchUser: () => void, info: string) => {
  redaxios.put(`http://localhost:6060/profile/info?text=${text}&name=${name}`).then((res) => {
    if (res.status === 200) {
      window.alert(200)
      refetchUser()
      info = text
    }
  })
}
