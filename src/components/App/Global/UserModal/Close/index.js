import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useDispatch } from 'react-redux'
import * as actions from 'store/actions'

const useStyles = makeStyles({
	root: {
		paddingLeft: 4,
		color: '#606266',
		fontSize: 13,
		cursor: 'pointer'
	}
})

export default function Close(props) {
	const { desc = '关闭', onClose = null } = props

	const dispatch = useDispatch()
	const classes = useStyles()

	const handleClose = useCallback(() => {
		dispatch(actions.updateMaskVisibleAction(false))
		onClose && onClose()
	}, [onClose])

	return (
		<u className={classes.root} onClick={handleClose}>
			{desc}
		</u>
	)
}
