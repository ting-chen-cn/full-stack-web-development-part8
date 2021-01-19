import React, { useState } from 'react'
import { ALL_BOOKS } from './query'
import { useQuery } from '@apollo/client'
import { Table, Button } from 'react-bootstrap'

const Books = (props) => {
  const [genresToShow, SetGenresToShow] = useState('')
  const result = useQuery(ALL_BOOKS)
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading ...</div>
  }
  const books = result.data.allBooks
  let booksToShow = books
  if (genresToShow) {
    booksToShow = books.filter((b) =>
      b.genres.includes(genresToShow.g)
    )
  }

  let genre = books.map((b) => b.genres).flat()
  let genres = [...new Set(genre)]

  return (
    <div>
      <h2>books</h2>
      <>
        in genre <strong>patters</strong>
      </>
      <Table striped>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a, index) => (
            <tr key={index}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {genres.map((g, index) => {
        return (
          <span key={index}>
            <Button
              key={index}
              variant='dark'
              onClick={() => SetGenresToShow({ g })}
            >
              {g}
            </Button>{' '}
          </span>
        )
      })}
    </div>
  )
}

export default Books
