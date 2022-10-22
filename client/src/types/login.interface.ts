export interface Ilogin {
  status: string
  authToken: string
  user: any
}

export interface IloginProps {
  email: string
  password: string
}
