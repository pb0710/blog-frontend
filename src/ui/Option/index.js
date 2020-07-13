import React from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import TouchRipple from '../TouchRipple'
import themeColors from '../utils/themeColors'

const useStyles = makeStyles({
	root: ({ color, isCurrent }) => ({
		display: isCurrent ? 'none' : 'flex',
		alignItems: 'center',
		position: 'relative',
		width: '100%',
		height: 32,
		paddingLeft: 8,
		transition: 'all .1s',

		'&:hover': {
			background: color.main
		}
	})
})

export default React.forwardRef(function Option(props, ref) {
	const {
		className,
		children,
		value,
		handleChange = () => {},
		color = 'default',
		timeout = 0,
		isCurrent = false
	} = props

	const classes = useStyles({
		timeout,
		isCurrent,
		color: themeColors[color]
	})

	const { rippleRef, handleStart, handleStop } = TouchRipple.useRipple()

	React.useImperativeHandle(
		ref,
		() => ({
			value,
			children
		}),
		[value, children]
	)

	const handleSelect = () => {
		setTimeout(() => {
			handleChange(value)
		}, timeout)
	}

	return (
		<div
			className={clsx(classes.root, className)}
			onMouseDown={handleStart}
			onMouseUp={handleStop}
			onMouseLeave={handleStop}
			onClick={handleSelect}
		>
			<TouchRipple ref={rippleRef} color={color} />
			{children}
		</div>
	)
})
