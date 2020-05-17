import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Route, Switch } from 'react-router'
import navMap from 'common/navMap'
import Article from 'components/Article'

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'row-reverse',
		width: '100%',
		height: '100%'
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
							<Route key={id + childId} path={path + childPath}>
								{childComponent}
							</Route>
						))
					) : (
						<Route key={id} path={path}>
							{component}
						</Route>
					)
				)}
				<Route path="/article/:id">
					<Article />
				</Route>
			</Switch>
		</div>
	)
}
