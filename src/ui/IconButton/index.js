import React from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import TouchRipple from '../TouchRipple'
import { useRipple } from '../utils/hooks'
import colorMap from '../utils/color'

const useStyles = makeStyles({
	root: ({ color, disabled }) => ({
		display: 'inline-block',
		position: 'relative',
		whiteSpace: 'nowrap',
		textAlign: 'center',
		width: 48,
		height: 48,
		color: color.text,
		background: 'transparent',
		outline: 0,
		border: 0,
		borderRadius: '50%',
		opacity: disabled && .5,
		cursor: disabled ? 'not-allowed' : 'pointer',
		transition: 'all 0.25s ease-out',

		'&:hover': {
			background: disabled || color.dim,
		},
	}),
})

export default React.memo(function IconButton(props) {

	const { children, className, disabled = false, onClick = null } = props

	const color = 'transparent'

	const classes = useStyles({ disabled, color: colorMap[color] })

	const { ref, handleStart, handleStop } = useRipple()

	const beNull = value => disabled ? null : value

	return (
		<button
			className={clsx(classes.root, className)}
			onClick={beNull(onClick)}
			onMouseDown={beNull(handleStart)}
			onMouseUp={beNull(handleStop)}
		>
			{beNull(<TouchRipple ref={ref} color={color} center={true} timeout={500} />)}
			{children}
		</button>
	)
})