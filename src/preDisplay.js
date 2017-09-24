import React from 'react'
import { compose, branch, renderComponent } from 'recompose'

const LoadingComponent = () => <span>Loading..</span>

const ErrorComponent = () => <span>Error..</span>

export default name =>
  compose(
    branch(props => props[name].loading, renderComponent(LoadingComponent)),
    branch(props => props[name].error, renderComponent(ErrorComponent)),
  )
