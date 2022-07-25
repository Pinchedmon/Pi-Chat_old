import redaxios from 'redaxios'
import authHeader from './authHeader'

interface apiParams {
  name: string
  email: string
  password: string
}
export async function getCurrentUser(): Promise<number | string> {
  const response = await redaxios.get('http://localhost:6060/auth/user', {
    headers: authHeader(),
  })
  return response.data
}

export async function signUp(params: apiParams): Promise<number | string> {
  const response = await redaxios.post('http://localhost:6060/auth/registration', { user: params })
  return response.data
}
