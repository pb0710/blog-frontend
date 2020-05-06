import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Route, Switch } from 'react-router'
import navMap from 'common/navMap'
import { useState } from 'react'
import { Button, Collapse } from 'ui'

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

	const [visible, setVisible] = useState(false)

	const handleToggleVisible = () => {
		console.log('visible: ', visible);
		setVisible(prev => !prev)
	}

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
			<Collapse visible={visible}>
				<div className={classes.test}></div>
			</Collapse>
			<Button onClick={handleToggleVisible}>切换</Button>
			<Collapse visible={visible}>
				<div className={classes.test}></div>
			</Collapse>
		</div>
	)
}