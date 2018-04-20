import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { compose, withState, withHandlers } from 'recompose'

const CREATE_NOTE = gql`
  mutation CreateNoteM ($detail: String!) {
    createNote(detail: $detail) {
      id
    }
  }
`

const enhance = compose(
  withState('detail', 'setDetail', ''),
  graphql(CREATE_NOTE, {
    name: 'createNoteQuery',
  }),
  withHandlers({
    submit: ({ detail, setDetail, createNoteQuery }) => () => {
      createNoteQuery({
        variables: {
          detail,
        },
      })
        .then(() => setDetail('')) // reset form
        .catch(err => console.error(err))
    },
  }),
)

const CreateNote = ({ detail, setDetail, submit }) => (
  <div className="columns">
    <div className="column is-half is-offset-one-quarter">
      <form
        onSubmit={e => {
          e.preventDefault()
          submit()
        }}
        className="field is-grouped"
      >
        <input
          type="text"
          className="input"
          onChange={e => setDetail(e.target.value)}
          value={detail}
        />
        <button type="submit" className="button">
          Create
        </button>
      </form>
    </div>
  </div>
)
export default enhance(CreateNote)
