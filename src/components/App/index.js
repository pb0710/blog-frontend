import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'
import Header from './Header'
import Sider from './Sider'
import Content from './Content'
import Global from './Global'

const useStyles = makeStyles({
	root: {
		width: '100%',
		minHeight: '100vh',
		maxHeight: ({ maskVisible }) => (maskVisible ? '100vh' : 'none'),
		overflow: 'hidden'
	}
})

export default function App() {
	const drawerOpened = useSelector(state => state.drawerOpened)
	const maskVisible = useSelector(state => state.maskVisible)
	const classes = useStyles({ drawerOpened, maskVisible })

	return (
		<div className={classes.root}>
			<Sider />
			<Header />
			<Content />
			<Global />
		</div>
	)
}
