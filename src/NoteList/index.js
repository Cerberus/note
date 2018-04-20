import { compose, withPropsOnChange } from 'recompose'
import React from 'react'
import gql from 'graphql-tag'

import EnQuery from 'EnQuery'
import Note from 'Note'

import { type NoteListQ } from './__generated__/NoteListQ';

const noteFragment = gql`
  fragment noteFragment on Note {
    id
    detail
  }
`

const ALL_NOTES = gql`
  query NoteListQ {
    allNotes {
      ...noteFragment
    }
  }
  ${noteFragment}
`

const ALL_NOTES_SUBSCRIPTION = gql`
  subscription NoteListS {
    Note(filter: { mutation_in: [CREATED, UPDATED, DELETED] }) {
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
`

const enhance = compose(
  withPropsOnChange('', () => ({
    subscribeToMoreParam: {
      document: ALL_NOTES_SUBSCRIPTION,
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
    },
  })),
)

const NoteList = props => (
  <EnQuery query={ALL_NOTES} subscribeToMoreParam={props.subscribeToMoreParam}>
    {({ allNotes }: NoteListQ) => (
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          <b>Note list{allNotes.length > 0 && `(${allNotes.length})`}</b>
          <ol>
            {allNotes.length <= 0 ? (
              <span>No task at here..</span>
            ) : (
              allNotes.map(note => <Note key={note.id} {...note} />)
            )}
          </ol>
        </div>
      </div>
    )}
  </EnQuery>
)

export default enhance(NoteList)
