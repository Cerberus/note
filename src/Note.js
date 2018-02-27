import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { compose } from 'recompose'

const DELETE_NOTE = gql`
  mutation($id: ID!) {
    deleteNote(id: $id) {
      id
    }
  }
`

const enhance = compose(
  graphql(DELETE_NOTE, {
    name: 'deleteLink',
    options: ({ id }) => ({
      variables: { id },
    }),
  }),
)
const Note = ({ detail, deleteLink }) => (
  <li>
    {detail}{' '}
    <a // eslint-disable-line jsx-a11y/anchor-has-content
      className="delete is-small"
      onClick={deleteLink}
      style={{ marginTop: '5px' }}
    />
  </li>
)

export default enhance(Note)
