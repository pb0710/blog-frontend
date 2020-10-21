import React from 'react'
import clsx from 'clsx'
import style from '../style/index.module.scss'
import { Paper } from 'sylas-react-ui'
import { Error, Warning, CheckCircle } from '@material-ui/icons'

export default function Tips(props) {
	const { children, type } = props

	function getTextColor() {
		switch (type) {
			case 'success':
				return style.success
			case 'warning':
				return style.warning
			case 'fail':
				return style.fail
			default:
				return ''
		}
	}

	function renderIcon() {
		switch (type) {
			case 'success':
				return <CheckCircle className={clsx(style.icon, style.success)} />
			case 'warning':
				return <Warning className={clsx(style.icon, style.warning)} />
			case 'fail':
				return <Error className={clsx(style.icon, style.fail)} />
			default:
				return null
		}
	}

	const tipsCls = clsx(style.tips_wrapper, getTextColor())

	return (
		<Paper className={tipsCls}>
			{renderIcon()}
			{children}
		</Paper>
	)
}
