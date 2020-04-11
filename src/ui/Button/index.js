import React from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import TouchRipple from '../TouchRipple'
import { useRipple } from '../utils/hooks'
import colorMap from '../utils/color'

const useStyles = makeStyles({
	root: ({ color }) => ({
		boxSizing: 'border-box',
		display: 'inline-block',
		position: 'relative',
		fontWeight: '500',
		whiteSpace: 'nowrap',
		textAlign: 'center',
		minWidth: 56,
		height: 32,
		background: color.main,
		outline: 0,
		border: 0,
		borderRadius: 2,
		boxShadow: '0 1px 3px rgba(26,26,26,.1)',
		color: color.text,
		padding: '4px 16px',
		transition: 'all 0.2s ease-out',

		'&:hover': {
			background: color.dim,
			cursor: 'pointer',
		},
	}),
})

function Button({ children, className, onClick, color = 'default' }) {

	const classes = useStyles({ color: colorMap[color] })

	const { ref, handleStart, handleStop } = useRipple()

	return (
		<button
			className={clsx(classes.root, className)}
			onClick={onClick}
			onMouseDown={handleStart}
			onMouseUp={handleStop}
		>
			<TouchRipple ref={ref} color={color} />
			{children}
		</button>
	)
}

export default React.memo(Button)