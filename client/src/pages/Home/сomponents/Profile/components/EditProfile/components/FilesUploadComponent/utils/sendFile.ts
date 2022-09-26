import redaxios from 'redaxios'

export const sendFile = async (
  e: React.SyntheticEvent<HTMLInputElement, Event>,
  refetch: () => void,
  refetchUser: () => void,
  pathImg: string,
  name: string,
) => {
  const target = e.target as HTMLInputElement
  const fdata = new FormData()
  fdata.append('avatar', target.files[0])
  await redaxios.put(`http://localhost:6060/profile/img?name="${name}"`, fdata).then((response) => {
    if (response.status === 200) {
      pathImg = response.data.data
      refetch()
      refetchUser()
    }
  })
}
