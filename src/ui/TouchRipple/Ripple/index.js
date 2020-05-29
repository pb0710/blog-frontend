import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import themeColors from '../../utils/themeColors'

const useStyles = makeStyles({
	root: ({ styles }) => ({
		position: 'absolute',
		...styles
	}),
	child: {
		display: 'block',
		width: '100%',
		height: '100%',
		borderRadius: '50%',
		background: ({ color }) => color.ripple
	},
	enter: {
		animation: '$enter ease-in-out forwards',
		animationDuration: ({ timeout }) => timeout
	},
	leave: {
		animation: '$exit ease-in-out forwards',
		animationDuration: ({ timeout }) => timeout
	},
	'@keyframes enter': {
		from: {
			transform: 'scale(0)',
			opacity: 0.1
		},
		to: {
			transform: 'scale(1)',
			opacity: 0.4
		}
	},
	'@keyframes exit': {
		from: {
			opacity: 1
		},
		to: {
			opacity: 0
		}
	}
})

export default function Ripple(props) {
	const { rippleX, rippleY, rippleSize, in: visible, onExited = () => {}, timeout = 400, color = 'default' } = props

	const styles = {
		width: rippleSize,
		height: rippleSize,
		left: rippleX - rippleSize / 2,
		top: rippleY - rippleSize / 2
	}

	const [leave, setLeave] = useState(false)
	const classes = useStyles({ styles, timeout, color: themeColors[color] })

	useEffect(() => {
		if (!visible) {
			setLeave(true)
			const timer = setTimeout(onExited, timeout)

			return () => {
				clearTimeout(timer)
			}
		}
	}, [visible, onExited, timeout])

	return (
		<span className={clsx(classes.root, classes.enter)}>
			<span className={clsx(classes.child, leave && classes.leave)}></span>
		</span>
	)
}
