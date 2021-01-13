import React, { useState } from 'react'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from './query'
import { useMutation } from '@apollo/client'
import { Button, Form, InputGroup } from 'react-bootstrap'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [createBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  })
  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    createBook({
      variables: {
        title,
        author,
        published: Number(published),
        genres,
      },
    })
    console.log('add book...')

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <Form onSubmit={submit}>
        <Form.Group>
          <InputGroup className='mb-3'>
            <InputGroup.Prepend>
              <InputGroup.Text id='basic-addon1'>
                title:
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </InputGroup>
          <InputGroup className='mb-3'>
            <InputGroup.Prepend>
              <InputGroup.Text id='basic-addon1'>
                author:
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              value={author}
              onChange={({ target }) => setAuhtor(target.value)}
            />
          </InputGroup>
          <InputGroup className='mb-3'>
            <InputGroup.Prepend>
              <InputGroup.Text id='basic-addon1'>
                published:
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type='number'
              value={published}
              onChange={({ target }) => setPublished(target.value)}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <InputGroup className='mb-3'>
            <Form.Control
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
            />
            <InputGroup.Append>
              <Button
                variant='outline-secondary'
                onClick={addGenre}
                type='button'
              >
                add genre
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <Form.Text>
            <span
              style={{
                fontSize: 20,
              }}
            >
              genres: {genres.join(' ')}
            </span>
          </Form.Text>
        </Form.Group>
        <Button variant='success' type='submit'>
          create book
        </Button>
      </Form>
    </div>
  )
}

export default NewBook
