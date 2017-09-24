import React from 'react'
import { compose } from 'recompose'
import { graphql, gql } from 'react-apollo'
import preDisplay from './preDisplay'
import Note from './Note'

const noteFragment = `
  fragment noteFragment on Note {
    id
    detail
  }
`

const ALL_NOTES = gql`
  query {
    allNotes{
      ...noteFragment
    }
  }
${noteFragment}
`

const enhance = compose(
  graphql(ALL_NOTES, {
    name: 'allNoteQuery',
    props: props => ({
      ...props,
      notes: props.allNoteQuery.allNotes,
    }),
  }),
  preDisplay('allNoteQuery'),
)

const NoteList = ({ notes }) => (
  <div className="columns">
    <div className="column is-half is-offset-one-quarter">
      <span>Note list</span>
      <ol>{notes.map(note => <Note key={note.id} {...note} />)}</ol>
    </div>
  </div>
)

export default enhance(NoteList)
