import React from 'react'
import BirthYearForm from './BirthYearForm'
import { ALL_AUTHORS } from './query'
import { useQuery } from '@apollo/client'
import { Table } from 'react-bootstrap'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <Table striped>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <BirthYearForm names={authors.map((a) => a.name)} />
    </div>
  )
}

export default Authors
