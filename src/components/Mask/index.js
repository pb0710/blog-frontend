import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useSelector, useDispatch } from 'react-redux'
import { updateMaskVisibleAction } from 'store/actions'
import { Paper } from 'sylas-react-ui'

const useStyles = makeStyles({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		position: 'fixed',
		top: 0,
		left: 0,
		backdropFilter: 'blur(40px)',
		overflow: 'none',
		zIndex: 8888,
		animation: '$fade-in 250ms forwards'
	},
	'@keyframes fade-in': {
		from: {
			opacity: 0
		},
		to: {
			opacity: 1
		}
	},
	'@keyframes fade-out': {
		from: {
			opacity: 1
		},
		to: {
			opacity: 0
		}
	}
})

// 全屏遮罩层
export default function Mask(props) {
	// TODO: closable
	const { children, closable = false } = props
	const dispatch = useDispatch()
	const maskVisible = useSelector(state => state.maskVisible)
	const classes = useStyles()

	const handleHideMask = useCallback(() => {
		closable && dispatch(updateMaskVisibleAction(false))
	}, [closable])

	return maskVisible ? (
		<Paper className={classes.root} onClick={handleHideMask}>
			{children}
		</Paper>
	) : null
}
