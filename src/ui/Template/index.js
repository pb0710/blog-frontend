import React from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'

const useStyles = makeStyles({
	root: {

	},
})

export default function Template(props) {

	const {
		className
	} = props

	const classes = useStyles()

	return (
		<div className={clsx(classes.root, className)}>

		</div>
	)
}