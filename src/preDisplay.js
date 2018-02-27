import React from 'react'
import { compose, branch, renderComponent } from 'recompose'
import styled from 'styled-components'

const LoadingBox = styled.div`
  background: linear-gradient(#00d1b2, #3dffe2);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  text-align: center;
  font-size: 24px;
  height: 64px;
`

const ErrorBox = LoadingBox.extend`
  background: -webkit-linear-gradient(pink, red);
`

const LoadingComponent = () => <LoadingBox>Loading..</LoadingBox>

const ErrorComponent = () => <ErrorBox>Error..</ErrorBox>

export default name =>
  compose(
    branch(props => props[name].loading, renderComponent(LoadingComponent)),
    branch(props => props[name].error, renderComponent(ErrorComponent)),
  )
