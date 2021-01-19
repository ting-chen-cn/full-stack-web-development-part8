import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { LOGIN } from './query'

// const asyncLocalStorage = {
//   setItem: function (key, value) {
//     return Promise.resolve().then(function () {
//       localStorage.setItem(key, value)
//     })
//   },
//   getItem: function (key) {
//     return Promise.resolve().then(function () {
//       return localStorage.getItem(key)
//     })
//   },
// }

const LoginForm = ({ setError, setToken, show, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    if (result.data) {
      console.log('-->', result.data)
      const token = result.data.login.value
      setTimeout(
        () => localStorage.setItem('library-user-token', token),
        100
      )
      setToken(token)
      // localStorage.setItem('library-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  const submit = (event) => {
    event.preventDefault()
    login({
      variables: { username, password },
    })
    setUsername('')
    setPassword('')
    setPage('authors')
  }
  if (!show) {
    return null
  }
  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={submit}>
        <Form.Group>
          <InputGroup className='mb-3'>
            <InputGroup.Prepend>
              <InputGroup.Text id='basic-addon1'>
                username:
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </InputGroup>
          <InputGroup className='mb-3'>
            <InputGroup.Prepend>
              <InputGroup.Text id='basic-addon1'>
                password:
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </InputGroup>
        </Form.Group>
        <Button variant='success' type='submit'>
          login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
