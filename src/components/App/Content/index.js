import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Switch, Route } from 'react-router'
import navMap from 'common/navMap'
import NotFound from 'pages/NotFound'
import ArticlePage from 'pages/ArticlePage'

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'row-reverse',
		width: '100%',
		minHeight: '100vh'
	}
})

export default function Content() {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Switch>
				{navMap.map(({ id, path, component, child }) =>
					child ? (
						child.map(({ id: childId, path: childPath, component: childComponent }) => (
							<Route key={id + childId} exact path={path + childPath}>
								{childComponent}
							</Route>
						))
					) : (
						<Route key={id} exact path={path}>
							{component}
						</Route>
					)
				)}
				<Route path="/article/:sort/:id" component={ArticlePage} />
				<Route component={NotFound} />
			</Switch>
		</div>
	)
}
