import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'
import { Container } from 'ui'

const useStyles = makeStyles({
	root: ({ drawerOpened }) => ({
		display: 'flex',
		flexDirection: 'row-reverse',
		position: 'fixed',
		top: 68,
		right: 0,
		left: 0,
		transition: 'transform 250ms ease-out',
		transform: drawerOpened ? 'translateX(120px)' : 'none',
	}),
	affixWrapper: {
		boxSizing: 'border-box',
		display: 'flex',
		flexDirection: 'column',
		width: 293,
	},
})

export default function AffixContainer(props) {

	const {
		children
	} = props

	const drawerOpened = useSelector(state => state.drawerOpened)
	const classes = useStyles({ drawerOpened })

	return (
		<Container className={classes.root}>
			<div className={classes.affixWrapper}>
				{children}
			</div>
		</Container>
	)
}