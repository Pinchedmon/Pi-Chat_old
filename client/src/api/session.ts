import redaxios from 'redaxios'
interface apiParams {
  email: string
  password: string
}

export async function login(params: apiParams): Promise<any> {
  const response = await redaxios.post('http://localhost:6060/auth/login', { session: params })
  return response.data
}

export async function logout() {
  localStorage.removeItem('user')
}
