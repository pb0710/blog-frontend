import React, { useMemo, useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import Glass from '../Glass'
import Paper from '../Paper'
import Button from '../Button'
import { useRenderCount, useCoordinate } from '../utils/hooks'

const useStyles = makeStyles({
	root: {
		zIndex: 999,
	},
	maskEnter: {
		animation: '$fade-in ease-out forwards',
		animationDuration: 300,
	},
	maskLeave: {
		animation: '$fade-out ease-out forwards',
		animationDuration: 300,
	},
	modalEnter: {
		animation: '$swell ease-out forwards',
		animationDuration: 300,
	},
	modalLeave: {
		animation: '$shrink ease-out forwards',
		animationDuration: 300,
	},
	'@keyframes fade-in': {
		from: {
			zIndex: -1,
			opacity: 0,
		},
		to: {
			zIndex: 111,
			opacity: 1,
		}
	},
	'@keyframes fade-out': {
		from: {
			zIndex: 111,
			opacity: 1,
		},
		to: {
			zIndex: -1,
			opacity: 0,
		}
	},
	'@keyframes swell': {
		from: {
			opacity: 0,
			transform: 'scale(0)',
		},
		to: {
			opacity: 1,
			transform: 'scale(1)',
		}
	},
	'@keyframes shrink': {
		from: {
			opacity: 1,
			transform: 'scale(1)',
		},
		to: {
			opacity: 0,
			transform: 'scale(0)',
		}
	},
	mask: {
		display: 'flex',
		justifyContent: 'center',
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100vw',
		height: '100vh',
		background: 'rgba(200,200,200,.2)',
		zIndex: -1,
	},
	modal: {
		display: 'flex',
		flexDirection: 'column',
		position: 'absolute',
		top: 'calc(50% - 120px)',
		width: 500,
		minHeight: 178,
		transformOrigin: ({ originX, originY }) => `${originX}px ${originY}px`,
	},
	title: {
		display: 'flex',
		alignItems: 'center',
		height: 56,
		fontSize: 17,
		fontWeight: 600,
		color: '#303133',
		padding: '0 16px',
		borderBottom: '1px solid #f0f0f0',
	},
	content: {
		display: 'flex',
		alignItems: 'center',
		padding: '24px 16px',
	},
	footer: {
		display: 'flex',
		flexDirection: 'row-reverse',
		alignItems: 'center',
		width: 'calc(100% - 32px)',
		height: 56,
		position: 'absolute',
		bottom: 0,
		padding: '0 16px',
		borderTop: '1px solid #f0f0f0',
	},
	operation: {
		display: 'flex',
		justifyContent: 'space-between',
		minWidth: 136
	}
})

export default function Dialog(props) {
	const {
		visible,
		children,
		onConfirm,
		onCancel,
		title = 'Title',
		maskClosable = false,
	} = props

	const modalRef = useRef()

	const [originX, setOriginX] = useState()
	const [originY, setOriginY] = useState()

	const classes = useStyles({ originX, originY })
	const count = useRenderCount()
	const { x, y } = useCoordinate(visible)

	const maskLeave = useMemo(() => count === 0 ? false : !visible, [visible, count])

	useEffect(() => {
		const element = modalRef.current
		const top = element.offsetTop
		const left = element.offsetLeft

		setOriginX(x - left)
		setOriginY(y - top)
	}, [x, y])

	return (
		<Glass
			className={clsx(classes.mask, visible && classes.maskEnter, maskLeave && classes.maskLeave)}
			onClick={maskClosable ? onCancel : () => { }}
		>
			<Paper
				ref={modalRef}
				className={clsx(classes.modal, visible ? classes.modalEnter : classes.modalLeave)}
			>
				<div className={classes.title}>{title}</div>
				<div className={classes.content}>{children}</div>
				<div className={classes.footer}>
					<div className={classes.operation}>
						<Button color="default" onClick={onCancel}>取消</Button>
						<Button color="primary" onClick={onConfirm}>确定</Button>
					</div>
				</div>
			</Paper>
		</Glass>
	)
}
