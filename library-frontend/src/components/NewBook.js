import React, { useState } from 'react'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from './query'
import { useMutation } from '@apollo/client'
import { Button, Form, InputGroup } from 'react-bootstrap'

const NewBook = ({ show, setPage, getUser }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  // const client = useApolloClient()

  // const updateCacheWith = (addBook) => {
  //   const booksInStore = client.readQuery({ query: ALL_BOOKS })
  //   if (
  //     !booksInStore.allBooks.some((book) => book.id === addBook.id)
  //   ) {
  //     client.writeQuery({
  //       query: ALL_BOOKS,
  //       data: {
  //         ...booksInStore,
  //         allBooks: [...booksInStore.allBooks, addBook],
  //       },
  //     })

  //     const allAuthors = client.readQuery({ query: ALL_AUTHORS })
  //       .allAuthors
  //     const authorsInStore = {
  //       allAuthors: allAuthors.map((author) => ({ ...author })),
  //     }
  //     const author = authorsInStore.allAuthors.find(
  //       (author) => author.name === addBook.author.name
  //     )
  //     if (author) {
  //       author.bookCount += 1
  //     } else {
  //       authorsInStore.allAuthors = [
  //         ...authorsInStore.allAuthors,
  //         addBook.author,
  //       ]
  //     }
  //     client.writeQuery({
  //       query: ALL_AUTHORS,
  //       data: authorsInStore,
  //     })
  //   }
  // }

  const [createBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  })
  if (!show) {
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
    setAuthor('')
    setGenres([])
    setGenre('')
    setPage('books')
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
              onChange={({ target }) => setAuthor(target.value)}
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
