export interface IUser {
  name: string
  img: string
  email: string
  password: string
  role: 'admin' | 'user' | 'driver'
}
