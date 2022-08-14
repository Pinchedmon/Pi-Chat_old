import redaxios from 'redaxios'
interface apiParams {
  email: string
  password: string
}
interface apiParamComments {
  id: number
  author: string
  name: string
  text: string
  userImg: string
  refetch: () => void
}
export async function login(props: apiParams): Promise<any> {
  const response = await redaxios.post('http://localhost:6060/auth/login', { session: props })
  return response.data
}
export async function postComment(props: apiParamComments, formData: any): Promise<any> {
  await redaxios
    .post(
      `http://localhost:6060/posts/comment?id=${props.id}&author=${props.author}&text=${props.text}&userImg=${props.userImg}`,
      formData,
    )
    .then((res) => {
      if (res.status === 200) {
        props.refetch()
        return res.data.data
      }
    })
}

export async function logout() {
  localStorage.removeItem('user')
}

export async function getPath(name: string | object | any) {
  let response
  if (name.name === undefined) {
    response = await redaxios.get(`http://localhost:6060/path?name="${name}";`)
  } else {
    response = await redaxios.get(`http://localhost:6060/path?name="${name.name}";`)
  }
  return response.data.data as string
}

export async function getMyPosts(name: string) {
  const response = await redaxios.get(`http://localhost:6060/posts/getMyPosts?name=${name}`)
  return response.data.data
}
