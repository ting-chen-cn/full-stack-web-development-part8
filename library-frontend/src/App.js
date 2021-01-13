import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Button, Nav } from 'react-bootstrap'

const App = () => {
  const [page, setPage] = useState('authors')

  return (
    <div className='container'>
      <Nav className='justify-content-center'>
        <Nav.Item>
          <Button
            variant='outline-dark'
            onClick={() => setPage('authors')}
          >
            authors
          </Button>
        </Nav.Item>
        <Nav.Item>
          <Button
            variant='outline-dark'
            onClick={() => setPage('books')}
          >
            books
          </Button>
        </Nav.Item>
        <Nav.Item>
          <Button
            variant='outline-dark'
            onClick={() => setPage('add')}
          >
            add book
          </Button>
        </Nav.Item>
      </Nav>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
