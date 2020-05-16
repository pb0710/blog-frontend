import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'
import Header from './Header'
import Sider from './Sider'
import Content from './Content'

const useStyles = makeStyles({
	root: {
		width: '100%',
		minHeight: '100vh',
		overflowX: 'hidden',
		overflowY: 'auto'
	}
})

export default function App() {
	const drawerOpened = useSelector((state) => state.drawerOpened)
	const classes = useStyles({ drawerOpened })

	return (
		<div className={classes.root}>
			<Sider />
			<Header />
			<Content />
		</div>
	)
}
