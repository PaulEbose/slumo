export type RegisterForm = {
  email: string
  username: string
  password: string
  confirmPassword: string
}

export type FormHelperMethod = readonly [boolean, FormError[]]

export type FormError = {
  message: string
}
