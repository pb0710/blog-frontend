import React from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import TouchRipple from '../TouchRipple'
import themeColors from '../utils/themeColors'

const useStyles = makeStyles({
	root: ({ color, focus, disabled }) => ({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
		whiteSpace: 'nowrap',
		width: 40,
		height: 40,
		color: color.text,
		fontSize: 16,
		background: focus ? 'rgba(120,120,120,.1)' : 'transparent',
		outline: 0,
		border: 0,
		borderRadius: '50%',
		opacity: disabled && 0.5,
		cursor: disabled ? 'not-allowed' : 'pointer',
		transition: 'all 0.25s ease-out',

		'&:hover': {
			background: disabled || color.dim
		}
	})
})

function IconButton(props, ref) {
	const { children, className, focus = false, disabled = false, onClick = null } = props

	const color = 'transparent'

	const classes = useStyles({ focus, disabled, color: themeColors[color] })

	const { rippleRef, handleStart, handleStop } = TouchRipple.useRipple()

	const beNull = value => (disabled ? null : value)

	return (
		<div
			type="button"
			ref={ref}
			className={clsx(classes.root, className)}
			onClick={beNull(onClick)}
			onMouseDown={beNull(handleStart)}
			onMouseUp={beNull(handleStop)}
			onMouseLeave={beNull(handleStop)}
		>
			{beNull(<TouchRipple ref={rippleRef} color={color} center={true} timeout={500} />)}
			{children}
		</div>
	)
}

export default React.memo(React.forwardRef(IconButton))
