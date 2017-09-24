import React from 'react'
import { compose, withHandlers, lifecycle } from 'recompose'
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
  withHandlers({
    subscribeNotes: ({ allNoteQuery }) => () => {
      allNoteQuery.subscribeToMore({
        document: gql`
          subscription {
            Note(filter: {
              mutation_in: [CREATED, UPDATED, DELETED] # support update
            }){
              mutation
              previousValues{
                id
              }
              updatedFields
              node {
                ...noteFragment
              }
            }
          }
          ${noteFragment}
      `,
        updateQuery: (prev, { subscriptionData: { data: { Note } } }) => {
          switch (Note.mutation) {
            case 'CREATED':
              return {
                ...prev,
                allNotes: [
                  ...prev.allNotes.filter(note => note.id !== Note.node.id),
                  Note.node,
                ],
              }
            case 'UPDATED':
              return {
                ...prev,
                allNotes: [
                  ...prev.allNotes.map(
                    note => (note.id === Note.node ? Note.node : note),
                  ),
                ],
              }
            case 'DELETED':
              return {
                ...prev,
                allNotes: [
                  ...prev.allNotes.filter(
                    note => note.id !== Note.previousValues.id,
                  ),
                ],
              }
            default:
              return prev
          }
        },
        onError: err => console.error(err),
      })
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.subscribeNotes()
    },
  }),
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
