import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
	root: {
		boxSizing: 'border-box',
		display: 'flex',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
		minHeight: '100vh',
		padding: 16,
		paddingTop: 68
	}
})

export default function FixedPage(props) {
	const { children } = props

	const classes = useStyles()

	return <div className={classes.root}>{children}</div>
}
