import React from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import colorMap from '../utils/color'

const ballStyles = {
	width: '100%',
	height: '100%',
	borderRadius: '50%',
	position: 'absolute',
	top: 0,
	left: 0,
	opacity: .6,
	mixBlendMode: 'multiply',
}

const dotstyles = {
	width: 16,
	height: 16,
	borderRadius: '100%',
	display: 'inline-block',
	opacity: .8,
}

const useStyles = makeStyles({
	bounceRoot: {
		width: 40,
		height: 40,
		position: 'relative',
	},
	ball1: ({ color }) => ({
		...ballStyles,
		background: color.name === 'default' ? '#888' : color.main,
	}),
	ball2: ({ color }) => ({
		...ballStyles,
		background: color.name === 'default' ? '#888' : color.main,
		animationDelay: -1000,
	}),
	bounce: {
		animation: '$ballStretch 2s infinite ease-in-out',
	},
	'@keyframes ballStretch': {
		'0%, 100%': {
			transform: 'scale(0)'
		},
		'50%': {
			transform: 'scale(1)'
		}
	},
	lineRoot: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: 56,
	},
	dot1: ({ color }) => ({
		...dotstyles,
		background: color.name === 'default' ? '#888' : color.main,
	}),
	dot2: ({ color }) => ({
		...dotstyles,
		background: color.name === 'default' ? '#888' : color.main,
		animationDelay: 160,
	}),
	dot3: ({ color }) => ({
		...dotstyles,
		background: color.name === 'default' ? '#888' : color.main,
		animationDelay: 320,
	}),
	line: {
		animation: '$dotStretch 1.4s infinite ease-in-out both',
	},
	'@keyframes dotStretch': {
		'0%, 80%, 100%': {
			transform: 'scale(0)',
		},
		'40%': {
			transform: 'scale(1)',
		}
	}
})

function Bounce({ classes }) {
	return (
		<div className={classes.bounceRoot}>
			<div className={clsx(classes.ball1, classes.bounce)}></div>
			<div className={clsx(classes.ball2, classes.bounce)}></div>
		</div>
	)
}

function Line({ classes }) {
	return (
		<div className={classes.lineRoot}>
			<div className={clsx(classes.dot1, classes.line)}></div>
			<div className={clsx(classes.dot2, classes.line)}></div>
			<div className={clsx(classes.dot3, classes.line)}></div>
		</div>
	)
}

export default React.memo(function Loading(props) {

	const { color = 'default', type = 'bounce' } = props

	const classes = useStyles({ color: colorMap[color] })

	const controlType = type => {
		switch (type) {
			case 'bounce':
				return <Bounce classes={classes} />

			case 'line':
				return <Line classes={classes} />

			default:
				return null
		}
	}

	return controlType(type)
})