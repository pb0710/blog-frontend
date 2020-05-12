import React from 'react'
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
		overflowY: 'auto',
	},
	rightWrapper: ({ drawerOpened }) => ({
		width: drawerOpened ? 'calc(100% - 240px)' : '100%',
		transition: 'width 200ms ease-out',
		overflowY: 'hidden',
	})
})

export default function App() {

	const drawerOpened = useSelector(state => state.drawerOpened)
	const classes = useStyles({ drawerOpened })

	return (
		<div className={classes.root}>
			<Sider />
			<div className={classes.rightWrapper}>
				<Header />
				<Content />
			</div>
		</div>
	)
}