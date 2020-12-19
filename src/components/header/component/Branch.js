import React from 'react'
import style from '../style/index.module.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useScrollToTop } from '@/utils/hooks'

function Branch(props) {
	const { to = '', name = 'BLOG' } = props
	const theme = useSelector(state => state.setting.theme)
	const { run: doScroll } = useScrollToTop(true)
	return (
		<Link className={style[`branch_${theme}`]} to={to} onClick={doScroll}>
			<span>{name}</span>
		</Link>
	)
}

export default React.memo(Branch)
