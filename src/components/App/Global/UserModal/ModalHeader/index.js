import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Loading } from 'sylas-react-ui'

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 160
	}
})

export default React.memo(function ModalHeader(props) {
	const { title, loading = false } = props

	const classes = useStyles()

	return (
		<div className={classes.root}>
			<h1>{title}</h1>
			{loading && <Loading.Bounce />}
		</div>
	)
})
