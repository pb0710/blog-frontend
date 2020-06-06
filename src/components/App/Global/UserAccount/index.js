import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Mask from 'components/Mask'
import Register from './Register'

const useStyles = makeStyles({
	root: {}
})

export default function UserAccount(props) {
	const {} = props

	const classes = useStyles()

	return (
		<Mask className={classes.root}>
			<Register />
		</Mask>
	)
}
