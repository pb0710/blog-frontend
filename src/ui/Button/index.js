import React from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import TouchRipple from '../TouchRipple'
import { useRipple } from '../utils/hooks'
import themeColors from '../utils/themeColors'

const useStyles = makeStyles({
	root: ({ color, disabled }) => ({
		boxSizing: 'border-box',
		display: 'inline-block',
		position: 'relative',
		fontWeight: '500',
		whiteSpace: 'nowrap',
		textAlign: 'center',
		minWidth: 56,
		height: 32,
		background: color.main,
		padding: '4px 16px',
		outline: 0,
		border: 0,
		borderRadius: 2,
		// default背景色太浅导致阴影明显，使得轮廓看起来比较大。单独调整下阴影
		boxShadow: `0 ${color.name === 'default' ? '0 1px' : '1px 3px'} rgba(26,26,26,.1)`,
		color: color.text,
		opacity: disabled && .5,
		cursor: disabled ? 'not-allowed' : 'pointer',
		transition: 'all 0.2s ease-out',

		'&:hover': {
			background: disabled || color.dim,
		},
	}),
})

export default React.memo(function Button(props) {

	const {
		children,
		className,
		onClick,
		color = 'default',
		disabled = false
	} = props

	const classes = useStyles({ disabled, color: themeColors[color] })

	const { rippleRef, handleStart, handleStop } = useRipple()

	const beNull = value => disabled ? null : value

	return (
		<button
			className={clsx(classes.root, className)}
			onClick={beNull(onClick)}
			onMouseDown={beNull(handleStart)}
			onMouseUp={beNull(handleStop)}
			onMouseLeave={beNull(handleStop)}
		>
			{beNull(<TouchRipple ref={rippleRef} color={color} />)}
			{children}
		</button>
	)
})