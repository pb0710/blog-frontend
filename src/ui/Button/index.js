import React, { useRef, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import TouchRipple from '../TouchRipple'
import { useRipple } from '../utils/hooks'
import colorMap from '../utils/color'

const useStyles = makeStyles({
	root: ({ color }) => ({
		display: 'inline-block',
		position: 'relative',
		fontWeight: '500',
		whiteSpace: 'nowrap',
		textAlign: 'center',
		minWidth: 56,
		height: 32,
		background: color.main,
		outline: 0,
		border: color.name === 'default' ? `1px solid ${color.border}` : 0,
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
		<>
			<button
				className={clsx(classes.root, className)}
				onClick={onClick}
				onMouseDown={handleStart}
				onMouseUp={handleStop}
			>
				<TouchRipple ref={ref} color={color} center={false} />
				{children}
			</button>
		</>
	)
}

export default Button