import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'

const useStyles = makeStyles({
	root: ({ drawerOpened }) => ({
		boxSizing: 'border-box',
		display: 'flex',
		flexDirection: 'column',
		width: 240,
		marginLeft: 16,
		position: 'fixed',
		top: 68,
		right: 'calc(50% - 524px)',
		transform: `translateX(${drawerOpened ? 120 : 0}px)`,
		transition: 'transform 200ms ease-out'
	})
})

export default function AffixContainer(props) {
	const { children } = props

	const drawerOpened = useSelector(state => state.drawerOpened)
	const classes = useStyles({ drawerOpened })

	return <div className={classes.root}>{children}</div>
}
