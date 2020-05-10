import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'
import Header from './Header'
import Sider from './Sider'
import Content from './Content'

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'row-reverse',
		width: '100%',
		minHeight: '100vh',
		background: '#f7f7f7',
		overflowX: 'hidden',
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
		overflowX: 'hidden',
		overflowY: 'auto',
		zIndex: 800,
	}),
	content: ({ drawerOpened }) => ({
		paddingTop: 68,
		paddingBottom: 16,
		width: drawerOpened ? 'calc(100% - 240px)' : '100%',
		transition: 'width 250ms ease-out',
	}),
})

export default function App() {

	const drawerOpened = useSelector(state => state.drawerOpened)
	const classes = useStyles({ drawerOpened })

	return (
		<div className={classes.root}>
			<div className={classes.header}>
				<Header />
			</div>
			<div className={classes.sider}>
				<Sider />
			</div>
			<div className={classes.content}>
				<Content />
			</div>
		</div>
	)
}