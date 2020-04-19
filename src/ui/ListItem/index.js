import React from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import TouchRipple from '../TouchRipple'
import { useRipple } from '../utils/hooks'
import colorMap from '../utils/color'

const useStyles = makeStyles({
	root: ({ color, bordered }) => ({
		display: 'flex',
		alignItems: 'center',
		boxSizing: 'border-box',
		position: 'relative',
		width: '100%',
		height: 40,
		margin: 0,
		padding: '0 24px',
		background: '#fff',
		borderBottom: bordered ? '1px solid #f0f0f0' : 0,
		borderRadius: bordered || 2,
		transition: 'all 0.15s ease-out',

		'&:hover': {
			background: color.dim,
		},

		'&:last-child': {
			border: 0
		}
	}),
})

function ListItem({ children, className, bordered = true, onClick }) {

	const color = 'transparent'
	const classes = useStyles({ color: colorMap[color], bordered })
	const { ref, handleStart, handleStop } = useRipple()

	return (
		<li 
			className={clsx(classes.root, className)}
			onMouseDown={handleStart}
			onMouseUp={handleStop}
			onClick={onClick}
		>
			<TouchRipple ref={ref} color={color} />
			{children}
		</li>
	)
}

export default React.memo(ListItem)