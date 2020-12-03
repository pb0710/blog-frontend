import React from 'react'
import style from '../style/index.module.scss'
import clsx from 'clsx'
import { GroundGlass } from 'sylas-react-ui'

export default function Mask(props) {
	const { children, className, ...rest } = props
	const maskCls = clsx(style.mask, className)
	return (
		<GroundGlass className={maskCls} {...rest}>
			{children}
		</GroundGlass>
	)
}
