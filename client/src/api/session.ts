import redaxios from 'redaxios'
interface apiParams {
  email: string
  password: string
}
interface apiParamComments {
  id: number
  author: string
  text: string
}
export async function login(props: apiParams): Promise<any> {
  const response = await redaxios.post('http://localhost:6060/auth/login', { session: props })
  return response.data
}
export async function postComment(props: apiParamComments): Promise<any> {
  const response = await redaxios.post('http://localhost:6060/feed/comments', { comment: props })
  return response.data.data
}

export async function logout() {
  localStorage.removeItem('user')
}
