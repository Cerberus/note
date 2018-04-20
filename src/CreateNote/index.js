import { compose, withState, withHandlers } from 'recompose'
import { graphql } from 'react-apollo'
import React from 'react'
import gql from 'graphql-tag'
import { ALL_NOTES } from 'NoteList'
import { NOTE_FRAGMENT } from 'schema/Note'

const CREATE_NOTE = gql`
  mutation CreateNoteM($detail: String!) {
    createNote(detail: $detail) {
      ...noteFragment
    }
  }
  ${NOTE_FRAGMENT}
`

const enhance = compose(
  withState('isSubmitting', 'setIsSubmitting', false),
  withState('detail', 'setDetail', ''),
  graphql(CREATE_NOTE, {
    name: 'createNoteQuery',
  }),
  withHandlers({
    submit: ({ detail, setDetail, createNoteQuery, setIsSubmitting }) => () => {
      setIsSubmitting(true)
      return createNoteQuery({
        variables: {
          detail,
        },
        update: (store, { data: { createNote } }) => {
          store.writeQuery({
            query: ALL_NOTES,
            data: {
              allNotes: [
                ...store
                  .readQuery({ query: ALL_NOTES })
                  .allNotes.filter(({ id }) => id !== createNote.id),
                createNote,
              ],
            },
          })
        },
      })
        .then(() => setDetail('')) // reset form
        .catch(err => console.error(err))
        .then(() => setIsSubmitting(false))
    },
  }),
)

class CreateNote extends React.PureComponent {
  constructor(props) {
    super(props)
    this.textInput = React.createRef()
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.submit().then(() => this.textInput.current.focus())
  }

  render() {
    const { detail, setDetail, isSubmitting } = this.props
    return (
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          <form onSubmit={this.onSubmit} className="field is-grouped">
            <input
              type="text"
              className="input"
              onChange={e => setDetail(e.target.value)}
              disabled={isSubmitting}
              placeholder="type here.."
              value={detail}
              ref={this.textInput}
            />
            <button type="submit" className="button">
              Create
            </button>
          </form>
        </div>
      </div>
    )
  }
}
export default enhance(CreateNote)
