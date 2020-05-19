import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Paper } from 'ui'
import clsx from 'clsx'
import { useRenderCount } from 'ui/utils/hooks'

const useStyles = makeStyles({
	root: {
		width: 320,
		minHeight: 400,
		boxShadow: '2px 4px 24px rgba(26,26,26,.14)',
		position: 'fixed',
		top: 64,
		right: 24,
		zIndex: -1,
		opacity: 0
	},
	enter: {
		animation: '$enter 250ms forwards'
	},
	leave: {
		animation: '$leave 150ms ease-out forwards'
	},
	'@keyframes enter': {
		'0%': {
			zIndex: -1,
			opacity: 0,
			transform: 'translateY(32px)'
		},
		'100%': {
			zIndex: 0,
			opacity: 1,
			transform: 'translateY(0)'
		}
	},
	'@keyframes leave': {
		from: {
			zIndex: 0,
			opacity: 1,
			transform: 'translateY(0)'
		},
		to: {
			zIndex: -1,
			opacity: 0,
			transform: 'translateY(32px)'
		}
	}
})

export default React.memo(function Popup(props) {
	const { children, className, visible = false, onClick = null } = props

	const classes = useStyles()

	const renderCount = useRenderCount()

	return renderCount === 0 ? null : (
		<Paper className={clsx(classes.root, className, visible ? classes.enter : classes.leave)} onClick={onClick}>
			{children}
		</Paper>
	)
})
