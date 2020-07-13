import React from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { NavLink } from 'react-router-dom'
import TouchRipple from '../TouchRipple'
import themeColors from '../utils/themeColors'

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
		textDecoration: 'none',
		color: '#303133',
		transition: 'all .15s ease-out',

		'&:hover': {
			background: color.main
		},

		'&:first-child': {
			borderTopLeftRadius: 2,
			borderTopRightRadius: 2
		},

		'&:last-child': {
			borderBottom: 0,
			borderBottomLeftRadius: 2,
			borderBottomRightRadius: 2
		}
	})
})

function ListItem(props) {
	const {
		children,
		className,
		activeClassName,
		bordered = true,
		rippleMuted = false,
		onClick = null,
		color = 'default',
		to = '/',
		linked = false
	} = props

	const classes = useStyles({
		color: themeColors[color],
		bordered
	})

	const { rippleRef, handleStart, handleStop } = TouchRipple.useRipple(rippleMuted)

	// 公用props
	const commonProps = React.useMemo(
		() => ({
			className: clsx(classes.root, className),
			onClick,
			onMouseDown: handleStart,
			onMouseUp: handleStop,
			onMouseLeave: handleStop
		}),
		[className, onClick, handleStart, handleStop]
	)

	const renderNavItem = () => (
		<NavLink {...commonProps} activeClassName={activeClassName} to={to} exact={to === '/'}>
			<TouchRipple ref={rippleRef} color={color} />
			{children}
		</NavLink>
	)

	const renderItem = () => (
		<li {...commonProps}>
			<TouchRipple ref={rippleRef} color={color} />
			{children}
		</li>
	)

	return linked ? renderNavItem() : renderItem()
}

export default React.memo(ListItem)
