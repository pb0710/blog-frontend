import React from 'react'
import style from '../style/index.module.scss'
import clsx from 'clsx'
import { GroundGlass } from 'sylas-react-ui'

/**
 * 遮罩，主要用于 Modal
 * @param {{
 * 	children: JSX.Element,
 * 	className: string,
 * 	rest: any[]
 * }} props
 * @returns
 */
function InternalMask(props) {
	const { children, className, ...rest } = props
	const maskCls = clsx(style.mask, className)
	return (
		<GroundGlass className={maskCls} {...rest}>
			{children}
		</GroundGlass>
	)
}

const Mask = React.memo(InternalMask)
export default Mask
