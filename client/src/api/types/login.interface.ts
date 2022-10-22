import { Iuser } from '../../types/user.interface'

export interface Ilogin {
  status: string
  authToken: string
  user: Iuser
}

export interface IloginProps {
  email: string
  password: string
}
