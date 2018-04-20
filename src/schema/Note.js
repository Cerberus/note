import gql from 'graphql-tag'

export const NOTE_FRAGMENT = gql`
  fragment noteFragment on Note {
    id
    detail
  }
`
