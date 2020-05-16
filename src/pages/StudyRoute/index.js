import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
	root: {}
})

export default function StudyRoute(props) {
	const {} = props

	const classes = useStyles()

	return (
		<div className={classes.root}>
			<h1>StudyRoute</h1>
		</div>
	)
}
