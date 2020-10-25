import React from 'react'
import style from '../style/index.module.scss'

function Banner(props) {
	const { children } = props
	return <article className={style.banner}>{children}</article>
}

export default React.memo(Banner)
