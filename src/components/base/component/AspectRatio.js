import React from 'react'
import style from '../style/index.module.scss'

/**
 * 可设置宽高比的容器组件
 * 基于 padding 实现
 * @param {{
 * 	children: JSX.Element,
 * 	aspectRatio: number
 * }} props
 * @returns
 */
function InternalAspectRatio(props) {
	const { children, aspectRatio = 1 } = props
	return (
		<div className={style.aspect_ratio_container} style={{ paddingBottom: `calc(${aspectRatio} * 100%)` }}>
			<div className={style.content}>{children}</div>
		</div>
	)
}

const AspectRatio = React.memo(InternalAspectRatio)
export default AspectRatio
