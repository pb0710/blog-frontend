import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import colorMap from '../../utils/color'

const useStyles = makeStyles({
	root: ({ styles }) => ({
		position: 'absolute',
		opacity: 0.3,
		...styles
	}),
	child: {
		opacity: 1,
		display: 'block',
		width: '100%',
		height: '100%',
		borderRadius: '50%',
		background: ({ color }) => color.ripple,
	},
	enter: {
		animation: '$enter ease-out',
		animationDuration: ({ timeout }) => timeout,
	},
	leave: {
		animation: '$exit ease-out forwards',
		animationDuration: ({ timeout }) => timeout
	},
	'@keyframes enter': {
		from: {
			transform: 'scale(0)',
			opacity: 0.1,
		},
		to: {
			transform: 'scale(1)',
			opacity: 0.3,
		}
	},
	'@keyframes exit': {
		from: {
			opacity: 1,
		},
		to: {
			opacity: 0,
		}
	}
})

export default function Ripple(props) {
	const {
		rippleX,
		rippleY,
		rippleSize,
		in: inProp,
		timeout = 500,
		color = 'default'
	} = props

	const styles = {
		width: rippleSize,
		height: rippleSize,
		left: rippleX - rippleSize / 2,
		top: rippleY - rippleSize / 2,
	}

	const [leave, setLeave] = useState(false)
	const classes = useStyles({ styles, timeout, color: colorMap[color] })

	useEffect(() => {
		inProp || setLeave(true)
	}, [inProp])

	return (
		<span className={clsx(classes.root, classes.enter)}>
			<span className={clsx(classes.child, leave && classes.leave)}></span>
		</span>
	)
}