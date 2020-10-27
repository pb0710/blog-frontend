import React from 'react'
import style from '../style/index.module.scss'

export default function AspectRatio(props) {
	const { children, aspectRatio = 1 } = props
	return (
		<div className={style.aspect_ratio_container} style={{ paddingBottom: `calc(${aspectRatio} * 100%)` }}>
			<div className={style.content}>{children}</div>
		</div>
	)
}
