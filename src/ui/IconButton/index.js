import React from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import TouchRipple from '../TouchRipple'
import { useRipple } from '../utils/hooks'
import colorMap from '../utils/color'

const useStyles = makeStyles({
	root: ({ color }) => ({
		display: 'inline-block',
		position: 'relative',
		whiteSpace: 'nowrap',
		textAlign: 'center',
		width: 48,
		height: 48,
		background: 'transparent',
		outline: 0,
		border: 0,
		borderRadius: '50%',
		transition: 'all 0.2s ease-out',

		'&:hover': {
			background: color.main,
			cursor: 'pointer',
		},
	}),
})

export default function IconButton({ children, className }) {

	const color = 'default'
	const classes = useStyles({ color: colorMap[color] })
	const { ref, handleStart, handleStop } = useRipple()

	return (
		<button
			className={clsx(classes.root, className)}
			onMouseDown={handleStart}
			onMouseUp={handleStop}
		>
			<TouchRipple ref={ref} center={true} timeout={600} />
			{children}
		</button>
	)
}