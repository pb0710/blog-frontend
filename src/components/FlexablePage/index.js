import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'

const useStyles = makeStyles({
	root: ({ drawerOpened }) => ({
		boxSizing: 'border-box',
		display: 'flex',
		justifyContent: 'center',
		width: drawerOpened ? 'calc(100% - 240px)' : '100%',
		height: '100%',
		minHeight: '100vh',
		paddingTop: 68,
		paddingBottom: 16,
		transition: 'width 200ms ease-out',
	}),
	container: {
		width: 1048,
		padding: '0 16px',
		margin: 0,
	}
})

export default function FlexablePage(props) {

	const {
		children
	} = props

	const drawerOpened = useSelector(state => state.drawerOpened)
	const classes = useStyles({ drawerOpened })

	return (
		<div className={classes.root}>
			<div className={classes.container}>
				{children}
			</div>
		</div>
	)
}