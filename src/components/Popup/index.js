import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Paper } from 'ui'
import clsx from 'clsx'

const useStyles = makeStyles({
	root: {
		width: 320,
		minHeight: 280,
		position: 'fixed',
		top: 48,
		right: 8,
		zIndex: -1,
		opacity: 0
	},
	enter: {
		animation: '$enter 300ms forwards'
	},
	leave: {
		animation: '$leave 150ms ease-out forwards'
	},
	'@keyframes enter': {
		'0%': {
			zIndex: -1,
			opacity: 0,
			transform: 'translateY(80px)'
		},
		'60%': {
			transform: 'translateY(-8px)'
		},
		'100%': {
			zIndex: 0,
			opacity: 1,
			transform: 'translateY(0)'
		}
	},
	'@keyframes leave': {
		from: {
			zIndex: 0,
			opacity: 1,
			transform: 'translateY(0)'
		},
		to: {
			zIndex: -1,
			opacity: 0,
			transform: 'translateY(40px)'
		}
	}
})

export default React.memo(function Popup(props) {
	const { children, className, visible = false, onClick = null } = props

	const classes = useStyles()

	return (
		<Paper
			className={clsx(classes.root, className, visible ? classes.enter : classes.leave)}
			onClick={onClick}>
			{children}
		</Paper>
	)
})
