import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Route, Switch } from 'react-router'
import navMap from 'common/navMap'

const useStyles = makeStyles({
	root: {
		paddingTop: 56,
		marginLeft: 300,
	},
	test: {
		width: 300,
		height: 500,
		background: 'orange',
	},
})

export default function Content(props) {

	const {

	} = props

	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Switch>
				{
					navMap.map(({ id, path, component }) => (
						<Route exact key={id} path={path}>
							{component}
						</Route>
					))
				}
			</Switch>
		</div>
	)
}