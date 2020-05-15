import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Paper, Divider } from 'ui'
import { MessageIcon } from 'ui/utils/icons'

const useStyles = makeStyles({
	root: {
		boxSizing: 'border-box',
		width: '100%',
		minHeight: 160,
		marginBottom: 16,
	
		'&>h2': {
			display: 'flex',
			alignItems: 'center',
			fontStyle: 'inherit',
			fontWeight: 'inherit',
			fontSize: 13,
			margin: 0,
			padding: '8px 12px',
			height: 32,
		},
	},
	title: {
		marginLeft: 8,
	},
	divider: {
		margin: 0,
	}
})

export default function Panel(props) {

	const {
		children,
		title,
	} = props

	const classes = useStyles()

	return (
		<Paper className={classes.root}>
			<h2>
				<MessageIcon />
				<span className={classes.title}>{title}</span>
			</h2>
			<Divider className={classes.divider} />
			{children}
		</Paper>
	)
}