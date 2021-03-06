import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Button, Nav } from 'react-bootstrap'
import LoginForm from './components/LoginForm'
import {
  useApolloClient,
  useLazyQuery,
  setError,
  useSubscription,
} from '@apollo/client'
import {
  ME,
  ALL_Books_By_Genre,
  BOOK_ADDED,
  ALL_BOOKS,
  ALL_AUTHORS,
} from './components/query'
import Recommendations from './components/Recommendations'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>
}
const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState('login')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(
    localStorage.getItem('library-user-token')
  )
  const [booksByUser, setBooksByUser] = useState([])
  const [user, setUser] = useState('')

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id)
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      })
    }
    const authorInStore = client.readQuery({ query: ALL_AUTHORS })
    if (
      !authorInStore.allAuthors
        .map((a) => a.name)
        .includes(addedBook.author.name)
    ) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: {
          allAuthors: authorInStore.allAuthors.concat(
            addedBook.author
          ),
        },
      })
    } else {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: {
          allAuthors: authorInStore.allAuthors.map((a) =>
            a.id === addedBook.author.id
              ? { ...a, bookCount: a.bookCount + 1 }
              : a
          ),
        },
      })
    }
    if (resultUser.data) {
      if (
        resultUser.data.me &&
        addedBook.genres.includes(resultUser.data.me.favoriteGenre)
      ) {
        console.log('resultUser.data', resultUser.data.me)
        client.watchQuery({
          query: getBooksByGenre,
          data: {
            allBooks: resultBooksByGenre.data.allBooks.concat(
              addedBook
            ),
          },
        })
      }
    }
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log('subscribe')
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      console.log(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    },
  })

  const [getUser, resultUser] = useLazyQuery(ME, {
    fetchPolicy: 'network-only',
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
  })
  const [getBooksByGenre, resultBooksByGenre] = useLazyQuery(
    ALL_Books_By_Genre
  )

  useEffect(() => {
    if (resultUser.data) {
      if (resultUser.data.me) {
        setUser(resultUser.data.me)
        getBooksByGenre({
          variables: { genres: resultUser.data.me.favoriteGenre },
        })
      }
    }
  }, [resultUser.data, getBooksByGenre])

  useEffect(() => {
    if (resultBooksByGenre.data) {
      setBooksByUser(resultBooksByGenre.data.allBooks)
    }
  }, [resultBooksByGenre.data])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setBooksByUser([])
    setPage('login')
  }
  const login = () => {
    setPage('login')
  }
  const recommend = () => {
    setPage('recommend')
    getUser()
  }

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
        {token ? (
          <Nav.Item>
            <Button
              variant='outline-dark'
              onClick={() => setPage('add')}
            >
              add book
            </Button>
          </Nav.Item>
        ) : null}
        <Nav.Item></Nav.Item>
        {token ? (
          <Nav.Item>
            <Button variant='outline-dark' onClick={recommend}>
              recommend
            </Button>
          </Nav.Item>
        ) : null}
        {token ? (
          <Nav.Item>
            <Button variant='outline-dark' onClick={logout}>
              logout
            </Button>
          </Nav.Item>
        ) : (
          <Nav.Item>
            <Button variant='outline-dark' onClick={login}>
              login
            </Button>
          </Nav.Item>
        )}
      </Nav>

      <Notify errorMessage={errorMessage} />
      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setError={notify}
        setPage={setPage}
      />

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <Recommendations
        show={page === 'recommend'}
        books={booksByUser}
        user={user}
      />

      <NewBook
        show={page === 'add'}
        setPage={setPage}
        setError={setError}
        updateCacheWith={updateCacheWith}
      />
    </div>
  )
}

export default App
