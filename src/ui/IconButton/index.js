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
		color: color.text,
		background: 'transparent',
		outline: 0,
		border: 0,
		borderRadius: '50%',
		transition: 'all 0.25s ease-out',

		'&:hover': {
			background: color.dim,
			cursor: 'pointer',
		},
	}),
})

function IconButton({ children, className, onClick }) {

	const color = 'transparent'
	const classes = useStyles({ color: colorMap[color] })
	const { ref, handleStart, handleStop } = useRipple()

	return (
		<button
			className={clsx(classes.root, className)}
			onClick={onClick}
			onMouseDown={handleStart}
			onMouseUp={handleStop}
		>
			<TouchRipple ref={ref} color={color} center={true} timeout={500} />
			{children}
		</button>
	)
}

export default React.memo(IconButton)