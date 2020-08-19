import md5 from 'md5'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Link, RouteChildrenProps, withRouter } from 'react-router-dom'
import { useAuth } from 'reactfire/firebaseApp/sdk'
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react'

import { displayErrorInput, displayFormErrors, validateRegisterForm } from '../helpers/form'
import { FormError } from '../types/Forms'

function Register({ history }: RouteChildrenProps) {
  const auth = useAuth()

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [registerFormErrors, setRegisterFormErrors] = useState<FormError[]>([])
  const [loading, setLoading] = useState(false)

  const handleChange = ({ target: { id, value } }: ChangeEvent<HTMLInputElement>) => {
    id === 'email' && setEmail(value)
    id === 'username' && setUsername(value)
    id === 'password' && setPassword(value)
    id === 'confirmPassword' && setConfirmPassword(value)
  }

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setRegisterFormErrors([])

    const [isValid, errors] = validateRegisterForm({ email, username, password, confirmPassword })

    if (!isValid) {
      setRegisterFormErrors(errors)
      return
    }

    setLoading(true)

    try {
      const createdUser = await auth.createUserWithEmailAndPassword(email, password)
      createdUser.user?.updateProfile({
        displayName: username,
        photoURL: `https://gravatar.com/avatar/${md5(createdUser.user.email!)}?d=identicon`,
      })
      history.push('/dashboard')
    } catch (error) {
      setRegisterFormErrors([error])
    }

    setLoading(false)
  }

  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column className="max-w-3xl">
        <Header as="h2" icon>
          <Icon name="magnet" className="text-blue-600" />
          <span className="text-indigo-300">Create an account for free</span>
        </Header>
        <Form onSubmit={handleSubmit}>
          <Segment className="bg-indigo-100" color="blue">
            <Form.Input
              fluid
              required
              className={displayErrorInput(registerFormErrors, 'username')}
              icon="user"
              iconPosition="left"
              type="text"
              id="username"
              value={username}
              autoComplete="username"
              placeholder="Username"
              onChange={handleChange}
            />

            <Form.Input
              fluid
              required
              className={displayErrorInput(registerFormErrors, 'email')}
              icon="mail"
              iconPosition="left"
              type="email"
              id="email"
              value={email}
              autoComplete="email"
              placeholder="Email Address"
              onChange={handleChange}
            />

            <Form.Input
              fluid
              required
              className={displayErrorInput(registerFormErrors, 'password')}
              icon="lock"
              iconPosition="left"
              type="password"
              id="password"
              value={password}
              autoComplete="new-password"
              placeholder="Password"
              onChange={handleChange}
            />

            <Form.Input
              fluid
              required
              className={displayErrorInput(registerFormErrors, 'password')}
              icon="unlock"
              iconPosition="left"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              autoComplete="new-password"
              placeholder="Confirm Password"
              onChange={handleChange}
            />

            <Button disabled={loading} fluid required color="blue" className={loading ? 'loading' : ''}>
              Submit
            </Button>
          </Segment>
        </Form>

        {!!registerFormErrors.length && <Message error>{displayFormErrors(registerFormErrors)}</Message>}

        <Message>
          <span>Already a user?</span>
          <Link to="/login"> Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default withRouter(Register)
