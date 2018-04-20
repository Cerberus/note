import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { compose } from 'recompose'
import { ALL_NOTES } from 'NoteList'
import { NOTE_FRAGMENT } from 'schema/Note'

const DELETE_NOTE = gql`
  mutation NoteM($id: ID!) {
    deleteNote(id: $id) {
      ...noteFragment
    }
  }
  ${NOTE_FRAGMENT}
`

const enhance = compose(
  graphql(DELETE_NOTE, {
    name: 'deleteLink',
    options: ({ id }) => ({
      variables: { id },
      update: (store, { data: { deleteNote } }) => {
        store.writeQuery({
          query: ALL_NOTES,
          data: {
            allNotes: [
              ...store
                .readQuery({ query: ALL_NOTES })
                .allNotes.filter(({ id }) => id !== deleteNote.id),
            ],
          },
        })
      },
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
