import axios from 'axios'
import { IgetCurrentUser } from './types/getCurrentUser.interface'
import { IgetUserData, IgetUserDataProps } from './types/getUserData.interface'
import { Ilogin, IloginProps } from './types/login.interface'
import { Isignup, IsignupProps } from './types/singup.interface'

export async function getCurrentUser(): Promise<IgetCurrentUser> {
  const response = await axios.get('http://localhost:6060/auth/user', {
    headers: { Authorization: 'Bearer ' + document.cookie },
  })
  return response.data
}

export const getUserData = async (props: IgetUserDataProps): Promise<IgetUserData> => {
  const { name, username, page } = props
  const response = await axios.get(`http://localhost:6060/profile/user?name=${name}&username=${username}&page=${page}`)
  return response.data
}

export async function signup(props: IsignupProps): Promise<Isignup> {
  const response = await axios.post('http://localhost:6060/auth/registration', { user: props })
  return response.data
}

export async function login(props: IloginProps): Promise<Ilogin> {
  const response = await axios.post('http://localhost:6060/auth/login', { session: props })
  return response.data
}
