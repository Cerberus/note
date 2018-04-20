import { Query } from 'react-apollo'
import { lifecycle } from 'recompose';
import React, { Fragment } from 'react'
import styled from 'styled-components'

type Props = {
	children: Function,
	allowEmpty: boolean,
	subscribeToMoreParam: Object,
}

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

const SubscriptionCaller = lifecycle({
	componentDidMount() {
		this.props.subscribeToMore()
	},
})(() => null)

const EnQuery = ({
	children,
	allowEmpty,
	subscribeToMoreParam,
	...rest
}: Props) => (
	<Query {...rest}>
		{result => {
			const { data, loading, error, subscribeToMore } = result
			if (loading) {
				return (
					<LoadingBox>Loading..</LoadingBox>
				)
			}
			if (error) {
				return <ErrorBox>Error..</ErrorBox>
			}
			return (
				<Fragment>
					{subscribeToMoreParam && (
						<SubscriptionCaller
							subscribeToMore={() => subscribeToMore(subscribeToMoreParam)}
						/>
					)}
					{children(data, result)}
				</Fragment>
			)
		}}
	</Query>
)

export default EnQuery
