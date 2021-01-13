import React from 'react'
import { ALL_BOOKS } from './query'
import { useQuery } from '@apollo/client'
import { Table } from 'react-bootstrap'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading ...</div>
  }
  const books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <Table striped>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Books
