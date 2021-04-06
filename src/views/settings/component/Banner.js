import React from 'react'
import style from '../style/index.module.scss'

/**
 * 页面顶部提示
 * @param {{
 * 	children: JSX.Element,
 * 	theme: 'primary | success | error | warning'
 * }} props
 * @returns {JSX.Element}
 */
function InternalBanner(props) {
	const { children, theme = 'primary' } = props
	return <article className={style[`banner_${theme}`]}>{children}</article>
}

const Banner = React.memo(InternalBanner)
export default Banner
