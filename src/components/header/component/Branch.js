import React from 'react'
import style from '../style/index.module.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Branch(props) {
	const { to = '/', name = 'BLOG' } = props
	const theme = useSelector(state => state.setting.theme)
	return (
		<Link className={style[`branch_${theme}`]} to={to}>
			<span>{name}</span>
		</Link>
	)
}

export default React.memo(Branch)
