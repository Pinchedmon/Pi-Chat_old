import { Iuser } from '../../types/user.interface'
import { IsignUpProps } from './signUpProps.interface'

export interface IauthContextType {
  user?: Iuser
  loading?: boolean
  error?: any
  logIn: (email: string, password: string) => void
  signUp: (props: IsignUpProps) => void
  logout: () => void
  refetchUser: () => void
}
