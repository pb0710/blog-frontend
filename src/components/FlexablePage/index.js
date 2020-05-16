import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

const useStyles = makeStyles({
	root: ({ drawerOpened }) => ({
		boxSizing: 'border-box',
		display: 'flex',
		justifyContent: 'center',
		width: drawerOpened ? 'calc(100% - 240px)' : '100%',
		height: '100%',
		minHeight: '100vh',
		transition: 'width 200ms ease-out'
	})
})

export default function FlexablePage(props) {
	const { children, className } = props

	const drawerOpened = useSelector((state) => state.drawerOpened)
	const classes = useStyles({ drawerOpened })

	return <div className={clsx(classes.root, className)}>{children}</div>
}
