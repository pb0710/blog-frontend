import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Route, Switch } from 'react-router'
import navMap from 'common/navMap'

const useStyles = makeStyles({
	root: {
		paddingTop: 56,
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