import React from 'react'
import { makeStyles } from '@material-ui/styles'
import UserModal from './UserModal'

const useStyles = makeStyles({
	root: {}
})

export default function Global(props) {
	const {} = props

	const classes = useStyles()

	return (
		<>
			<UserModal />
		</>
	)
}
