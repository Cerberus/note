import React from 'react'
import { compose, withHandlers, lifecycle, mapProps } from 'recompose'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
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
    allNotes {
      ...noteFragment
    }
  }
  ${noteFragment}
`

const enhance = compose(
  preDisplay,
  withHandlers({
    subscribeNotes: info => () => {
      info.subscribeToMore({
        document: gql`
          subscription {
            Note(
              filter: {
                mutation_in: [CREATED, UPDATED, DELETED] # support update
              }
            ) {
              mutation
              previousValues {
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
  mapProps(({ data, ...rest }) => ({ notes: data.allNotes, ...rest })),
)

const NoteList = ({ notes }) => (
  <div className="columns">
    <div className="column is-half is-offset-one-quarter">
      <span>Note list</span>
      <ol>{notes.map(note => <Note key={note.id} {...note} />)}</ol>
    </div>
  </div>
)

const EnhanceNoteList = enhance(NoteList)

export default props => (
  <Query query={ALL_NOTES}>
    {info => <EnhanceNoteList {...info} {...props} />}
  </Query>
)
