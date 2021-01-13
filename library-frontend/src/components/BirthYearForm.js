import React, { useState } from 'react'
import { EDIT_AUTHOR, ALL_AUTHORS } from './query'
import { useMutation } from '@apollo/client'
import { InputGroup, Form, Button } from 'react-bootstrap'

const BirthYearForm = ({ names }) => {
  const [birthYear, setBirthYear] = useState('')
  const [name, setName] = useState('')
  const [changeBirthYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })
  const submit = (event) => {
    event.preventDefault()
    changeBirthYear({
      variables: { name, setBornTo: Number(birthYear) },
    })
    setName('')
    setBirthYear('')
  }
  return (
    <div>
      <h2>Set birthyear</h2>
      <Form onSubmit={submit}>
        <Form.Group>
          <Form.Control
            as='select'
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            {names.map((a, index) => (
              <option key={index} value={a}>
                {a}
              </option>
            ))}
          </Form.Control>
          <InputGroup className='mb-3'>
            <InputGroup.Prepend>
              <InputGroup.Text id='basic-addon1'>
                born:
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type='number'
              value={birthYear}
              onChange={({ target }) => setBirthYear(target.value)}
            />
          </InputGroup>

          <Button variant='success' type='submit'>
            update author
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BirthYearForm
