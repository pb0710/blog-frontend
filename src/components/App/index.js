import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Header from './Header'
import Sider from './Sider'
import Content from './Content'

const useStyles = makeStyles({
	root: {
		width: '100vw',
		height: '100vh',
		background: '#f7f7f7',
		overflowY: 'auto',
	},
	header: ({ drawerOpened }) => ({
		position: 'fixed',
		top: 0,
		right: 0,
		width: drawerOpened ? 'calc(100% - 240px)' : '100%',
		height: 52,
		transition: 'width 250ms ease-out',
		zIndex: 700,
	}),
	sider: ({ drawerOpened }) => ({
		width: 240,
		height: '100%',
		position: 'fixed',
		top: 0,
		left: 0,
		borderRight: '1px solid #eaeaea',
		transform: `translateX(${drawerOpened ? 0 : -240}px)`,
		transition: 'transform 250ms ease-out',
		overflowY: 'auto',
		zIndex: 800,
	}),
	content: ({ drawerOpened }) => ({
		paddingTop: 68,
		// transitionDelay: drawerOpened ? '0ms' : '250ms',
		transition: 'width 250ms ease-out',
		width: drawerOpened ? 'calc(100% - 240px)' : '100%',
		height: '100%',
		position: 'fixed',
		top: 0,
		right: 0,
		overflowY: 'auto',
	}),
})

export default function App() {

	const [drawerOpened, setDrawerOpened] = useState(false)

	const classes = useStyles({ drawerOpened })

	const drawerProps = { drawerOpened, setDrawerOpened }

	return (
		<div className={classes.root}>
			<div className={classes.header}>
				<Header {...drawerProps} />
			</div>
			<div className={classes.sider}>
				<Sider {...drawerProps} />
			</div>
			<div className={classes.content}>
				<Content {...drawerProps} />
			</div>
		</div>
	)
}