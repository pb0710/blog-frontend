import React from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import TouchRipple from '../TouchRipple'
import { useRipple } from '../utils/hooks'
import themeColors from '../utils/themeColors'
import { NavLink } from 'react-router-dom'

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
		transition: 'all .15s ease-out',

		'&:hover': {
			background: color.main,
		},

		'&:last-child': {
			border: 0
		}
	}),
})

function ListItem(props) {

	const {
		children,
		className,
		activeClassName,
		bordered = true,
		onClick = () => { },
		to = '/',
		color = 'default'
	} = props

	const classes = useStyles({
		color: themeColors[color],
		bordered
	})

	const { rippleRef, handleStart, handleStop } = useRipple()

	return (
		<NavLink
			className={clsx(classes.root, className)}
			activeClassName={activeClassName}
			to={to}
			onClick={onClick}
			onMouseDown={handleStart}
			onMouseUp={handleStop}
		>
			<TouchRipple ref={rippleRef} color={color} />
			{children}
		</NavLink>
	)
}

export default React.memo(ListItem)