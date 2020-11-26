import clsx from 'clsx'
import React from 'react'
import style from '../style/index.module.scss'

function Skeleton(props) {
	const { className, ...rest } = props
	return <div className={clsx(style.skeleton, className)} {...rest}></div>
}

export default Skeleton
