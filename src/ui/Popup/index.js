import React, { memo, forwardRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Paper } from 'ui'
import clsx from 'clsx'
import { TransitionGroup } from 'react-transition-group'

const useStyles = makeStyles({
	root: {
		width: 360,
		minHeight: 400,
		boxShadow: '0 4px 24px rgba(26,26,26,.14)',
		position: 'fixed',
		top: 64,
		right: 24,
		userSelect: 'none'
	},
	enter: {
		animation: '$enter 200ms ease-out forwards'
	},
	leave: {
		animation: '$leave 150ms ease-out forwards'
	},
	'@keyframes enter': {
		'0%': {
			zIndex: -1,
			opacity: 0,
			transform: 'translateY(32px)'
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
			transform: 'translateY(32px)'
		}
	}
})

const Window = forwardRef((props, ref) => {
	const { children, className, onClick = null, in: inProp, onExited = () => {}, timeout = 150 } = props
	const classes = useStyles()

	useEffect(() => {
		if (!inProp) {
			const exitTimer = setTimeout(onExited, timeout)
			return () => {
				clearTimeout(exitTimer)
			}
		}
	}, [inProp, onExited, timeout])

	return (
		<Paper
			ref={ref}
			className={clsx(classes.root, className, inProp ? classes.enter : classes.leave)}
			onClick={onClick}
		>
			{children}
		</Paper>
	)
})

const Popup = forwardRef((props, ref) => {
	const { visible = false } = props
	return <TransitionGroup component={null}>{visible && <Window ref={ref} {...props} />}</TransitionGroup>
})

export default memo(Popup)
