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
		position: 'relative',
		width: 'calc(100% - 48px)',
		minHeight: 40,
		padding: '0 24px',
		margin: 0,
		borderBottom: bordered ? '1px solid #f0f0f0' : 0,
		borderRadius: bordered || 2,
		transition: 'all .15s ease-out',

		'&:hover': {
			background: color.main,
		},

		'&:first-child': {
			borderTopLeftRadius: 2,
			borderTopRightRadius: 2,
		},

		'&:last-child': {
			borderBottom: 0,
			borderBottomLeftRadius: 2,
			borderBottomRightRadius: 2,
		},
	}),
})

function ListItem(props) {

	const {
		children,
		className,
		activeClassName,
		bordered = true,
		rippleMuted = false,
		onClick = () => { },
		color = 'default',
		to = '/',
		linked = false
	} = props

	const classes = useStyles({
		color: themeColors[color],
		bordered
	})

	const { rippleRef, handleStart, handleStop } = useRipple(rippleMuted)

	return (
		linked
			? (
				<NavLink
					className={clsx(classes.root, className)}
					activeClassName={activeClassName}
					to={to}
					onClick={onClick}
					onMouseDown={handleStart}
					onMouseUp={handleStop}
					onMouseLeave={handleStop}
				>
					<TouchRipple ref={rippleRef} color={color} />
					{children}
				</NavLink>
			)
			: (
				<li
					className={clsx(classes.root, className)}
					onClick={onClick}
					onMouseDown={handleStart}
					onMouseUp={handleStop}
					onMouseLeave={handleStop}
				>
					<TouchRipple ref={rippleRef} color={color} />
					{children}
				</li>
			)
	)
}

export default React.memo(ListItem)