import { Iuser } from '../../types/user.interface'

export interface Ilogin {
  status: number
  authToken: string
  user: Iuser
  message?: string
}

export interface IloginProps {
  email: string
  password: string
}
