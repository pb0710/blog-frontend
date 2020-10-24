import React from 'react'
import style from '../style/index.module.scss'
import { Link } from 'react-router-dom'

function Branch(props) {
	const { to = '/', name = 'Blog' } = props
	return (
		<Link className={style.branch} to={to}>
			<span>{name}</span>
		</Link>
	)
}

export default React.memo(Branch)
