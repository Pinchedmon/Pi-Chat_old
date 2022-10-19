import redaxios from 'redaxios'
export const follow = (name: string, object: string, refetch: () => void) => {
  redaxios.post(`http://localhost:6060/follow/follow?name=${name}&object=${object}`).then((res: any) => {
    if (res.status === 200) {
      refetch()
    }
  })
}
