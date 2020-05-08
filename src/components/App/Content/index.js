import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Route, Switch } from 'react-router'
import navMap from 'common/navMap'

const useStyles = makeStyles({
	root: {
		
	}
})

export default function Content(props) {

	const {
		drawerOpened
	} = props

	const classes = useStyles({ drawerOpened })

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