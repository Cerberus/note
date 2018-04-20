import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { compose, withState, withHandlers } from 'recompose'

const CREATE_NOTE = gql`
  mutation CreateNoteM($detail: String!) {
    createNote(detail: $detail) {
      id
    }
  }
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
