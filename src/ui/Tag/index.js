import React from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { CloseOutlineIcon } from '../utils/icons'
import themeColors from '../utils/themeColors'

const useStyles = makeStyles({
	root: ({ bordered, color }) => ({
		boxSizing: 'border-box',
		display: 'flex',
		alignItems: 'center',
		height: 20,
		minWidth: 32,
		fontSize: 12,
		color: color.main,
		background: color.ripple,
		padding: '0 4px',
		border: bordered ? `1px solid ${color.bright}` : 0,
		borderRadius: 2,
		cursor: 'default',

		'&>i': {
			display: 'flex',
			alignItems: 'center',
			height: '100%',
			fontSize: 10,
			marginLeft: 4,
			cursor: 'pointer',
			transition: 'color 250ms',

			'&:hover': {
				color: color.dim
			}
		}
	})
})

export default function Tag(props) {
	const {
		className,
		children,
		color = 'primary',
		bordered = false,
		closeable = false,
		onClose = null
	} = props

	const classes = useStyles({
		bordered,
		color: themeColors[color]
	})

	return (
		<div className={clsx(classes.root, className)}>
			{children}
			{closeable && (
				<i onClick={onClose}>
					<CloseOutlineIcon />
				</i>
			)}
		</div>
	)
}
