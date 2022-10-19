import redaxios from 'redaxios'

export const unFollow = async (name: string, object: string, refetch: () => void) => {
  redaxios.delete(`http://localhost:6060/follow/unfollow?name=${name}&object=${object}`).then((res: any) => {
    if (res.status === 200) {
      refetch()
    }
  })
}
