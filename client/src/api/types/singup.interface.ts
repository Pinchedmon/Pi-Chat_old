import { Iuser } from '../../types/user.interface'
export interface IsignupProps {
  name: string
  email: string
  password: string
}
export interface Isignup {
  status: number
  authToken?: string
  message?: string
  user: Iuser
}
