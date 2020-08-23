import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Link, RouteChildrenProps, withRouter } from 'react-router-dom'
import { useAuth } from 'reactfire/firebaseApp/sdk'
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react'
import { checkFields, displayErrorInput, displayFormErrors } from '../helpers/form'
import { FormError } from '../types/Forms'

function Login({ history }: RouteChildrenProps) {
  const auth = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginFormErrors, setLoginFormErrors] = useState<FormError[]>([])
  const [loading, setLoading] = useState(false)

  const handleChange = ({ target: { id, value } }: ChangeEvent<HTMLInputElement>) => {
    id === 'email' && setEmail(value)
    id === 'password' && setPassword(value)
  }

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const [isValid, errors] = checkFields(email, password)

    if (!isValid) {
      setLoginFormErrors(errors)
      return
    }

    setLoading(true)

    try {
      await auth.signInWithEmailAndPassword(email, password)
      history.push('/dashboard')
    } catch (error) {
      setLoginFormErrors([error])
    }

    setLoading(false)
  }

  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column className="max-w-3xl">
        <Header as="h2" icon>
          <Icon name="magnet" className="text-blue-600" />
          <span className="text-indigo-300">Login to Slumo</span>
        </Header>
        <Form onSubmit={handleSubmit}>
          <Segment className="bg-indigo-100" color="blue">
            <Form.Input
              fluid
              required
              className={displayErrorInput(loginFormErrors, 'email')}
              icon="mail"
              iconPosition="left"
              type="email"
              id="email"
              value={email}
              autoComplete="email"
              placeholder="Email Address"
              aria-label="Email Address"
              onChange={handleChange}
            />

            <Form.Input
              fluid
              required
              className={displayErrorInput(loginFormErrors, 'password')}
              icon="lock"
              iconPosition="left"
              type="password"
              id="password"
              value={password}
              autoComplete="new-password"
              placeholder="Password"
              aria-label="Password"
              onChange={handleChange}
            />

            <Button disabled={loading} fluid required color="blue" className={loading ? 'loading' : ''}>
              Submit
            </Button>
          </Segment>
        </Form>

        {!!loginFormErrors.length && (
          <Message error>
            <h4>Error</h4>
            {displayFormErrors(loginFormErrors)}
          </Message>
        )}

        <Message>
          <span>Don't have an account?</span>
          <Link to="/register"> Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default withRouter(Login)
