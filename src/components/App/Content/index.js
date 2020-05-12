import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Route, Switch } from 'react-router'
import { useSelector } from 'react-redux'
import navMap from 'common/navMap'

const useStyles = makeStyles({
	root: {
		width: '100%',
		height: '100%',
		paddingTop: 68,
		paddingBottom: 16,
	}
})

export default function Content(props) {

	const {

	} = props

	const drawerOpened = useSelector(state => state.drawerOpened)
	const classes = useStyles({ drawerOpened })

	return (
		<div className={classes.root}>
			<Switch >
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
		</div>
	)
}