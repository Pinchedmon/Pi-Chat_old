import redaxios from 'redaxios'
interface apiParams {
  name: string
  email: string
  password: string
}
export async function getCurrentUser(authToken: string | undefined): Promise<any> {
  const response = await redaxios.get('http://localhost:6060/auth/user', {
    headers: { Authorization: 'Bearer ' + authToken },
  })
  return response.data
}
export async function getUserData(name: string): Promise<any> {
  const response = await redaxios.get(`http://localhost:6060/profile/user?name=${name}`)
  return response.data
}
export async function signUp(params: apiParams): Promise<number | string> {
  const response = await redaxios.post('http://localhost:6060/auth/registration', { user: params })
  return response.data
}
