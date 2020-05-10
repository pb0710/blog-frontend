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
		<Switch className={classes.root}>
			{
				navMap.map(({ id, path, component, child }) => (
					child
						? child.map(({
							id: childId,
							path: childPath,
							component: childComponent
						}) =>
							<Route key={id + childId} path={path + childPath}>
								{childComponent}
							</Route>
						)
						:
						<Route key={id} path={path}>
							{component}
						</Route>
				))
			}
		</Switch>
	)
}