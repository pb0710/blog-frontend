import React from 'react'
import style from '../style/index.module.scss'

function Banner(props) {
	const { children, theme = 'primary' } = props
	return <article className={style[`banner_${theme}`]}>{children}</article>
}

export default React.memo(Banner)
