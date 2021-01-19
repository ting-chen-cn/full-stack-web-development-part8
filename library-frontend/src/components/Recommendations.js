import React from 'react'
import { Table } from 'react-bootstrap'

export const Recommendations = ({ show, books, user }) => {
  if (!show || books === []) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <>
        books in your favorite genre{' '}
        <strong> {user.favoriteGenre}</strong>
      </>
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
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
export default Recommendations
