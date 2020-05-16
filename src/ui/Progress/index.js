import React from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import themeColors from '../utils/themeColors'

const useStyles = makeStyles({
	root: ({ fixedStyles, trailColor }) => ({
		position: 'relative',
		...fixedStyles,
		width: '100%',
		height: 2,
		background: trailColor
	}),
	line: ({ percent, color }) => ({
		width: `${percent}%`,
		height: '100%',
		background: color.main,
		position: 'absolute',
		top: 0,
		left: 0,
		transition: 'all .2s'
	})
})

export default React.memo(function Progress(props) {
	const {
		className,
		percent = 0,
		color = 'primary',
		trailColor = 'rgba(0,0,0,0)',
		fixed = true
	} = props

	const fixedStyles = fixed
		? {
				zIndex: 99,
				position: 'fixed',
				top: 0,
				left: 0
		  }
		: {}

	const classes = useStyles({
		color: themeColors[color],
		trailColor,
		percent,
		fixedStyles
	})

	return (
		<div className={clsx(classes.root, className)}>
			<div className={classes.line}></div>
		</div>
	)
})
