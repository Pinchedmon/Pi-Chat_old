import redaxios from 'redaxios'

export async function getCurrentUser(): Promise<any> {
  const response = await redaxios
    .get('http://localhost:6060/auth/user', {
      headers: { Authorization: 'Bearer ' + document.cookie },
    })
    .then((res) => {
      if (res.status === 200) {
        return res
      }
    })
  if (response !== undefined) {
    return response
  }
}
export async function getUserData(name: string): Promise<any> {
  const response = await redaxios.get(`http://localhost:6060/profile/user?name=${name}`)
  return response.data
}

export async function signup(params: { name: string; email: string; password: string }): Promise<number | string> {
  const response = await redaxios.post('http://localhost:6060/auth/registration', { user: params })
  return response.data
}

export async function login(props: { email: string; password: string }): Promise<any> {
  const response = await redaxios.post('http://localhost:6060/auth/login', { session: props })
  return response.data
}
