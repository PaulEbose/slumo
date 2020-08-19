import { createElement } from 'react'
import { FormError, FormHelperMethod, RegisterForm } from '../types/Forms'

export const displayErrorInput = (errors: FormError[], inputName: string) =>
  errors.some((error) => error.message.toLowerCase().includes(inputName)) ? 'error' : ''

export const displayFormErrors = (errors: FormError[]) =>
  errors.map((error, idx) => createElement('p', { key: idx }, error.message))

export function validateRegisterForm({ email, username, password, confirmPassword }: RegisterForm): FormHelperMethod {
  const [isFormFilled, checkFieldErrors] = checkFields(email, username, password, confirmPassword)
  const [isUsernameValid, usernameErrors] = validateUsername(username)
  const [isEmailValid, emailErrors] = validateEmail(email)
  const [isPasswordValid, passwordErrors] = validatePassword(password, confirmPassword)

  if (!isFormFilled) {
    return [isFormFilled, checkFieldErrors]
  }

  if (!isUsernameValid) {
    return [isUsernameValid, usernameErrors]
  }

  if (!isEmailValid) {
    return [isEmailValid, emailErrors]
  }

  if (!isPasswordValid) {
    return [isPasswordValid, passwordErrors]
  }

  return [true, []]
}

export function checkFields(...fields: string[]): FormHelperMethod {
  let value: FormHelperMethod = [true, []]

  fields.forEach((field) => {
    if (!field.length) {
      value = [false, [{ message: 'Please fill in all fields' }]]
    }
  })

  return value
}

export function validateUsername(username: string): FormHelperMethod {
  const usernameRegex = /^(?=.*\w)(?!.*\s).{4,16}$/
  const usernameMessages: FormError[] = [
    { message: 'Username should be between 4 to 16 characters' },
    { message: 'Username can contain letters, numbers and underscores' },
    { message: 'Username should contain no spaces' },
  ]

  if (!usernameRegex.test(username)) {
    return [false, usernameMessages]
  }

  return [true, []]
}

export function validateEmail(email: string): FormHelperMethod {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (!emailRegex.test(email)) {
    return [false, [{ message: 'Enter a valid email address' }]]
  }

  return [true, []]
}

export function validatePassword(password: string, confirmPassword?: string): FormHelperMethod {
  const passwordRegex = /^(?=.*\d)(?=.*\w)(?!.*\s).{8,32}$/
  const passwordMessages: FormError[] = [
    { message: 'Password should be between 8 to 32 characters' },
    { message: 'Password should contain at least one number' },
    { message: 'Password should contain at least one letter' },
    { message: 'Password should contain no spaces' },
  ]

  if (!passwordRegex.test(password)) {
    return [false, passwordMessages]
  }

  if (confirmPassword && password !== confirmPassword) {
    return [false, [{ message: 'Passwords must match' }]]
  }

  return [true, []]
}
