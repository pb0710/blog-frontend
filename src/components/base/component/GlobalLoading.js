import React from 'react'
import { Loading } from 'sylas-react-ui'
import style from '../style/index.module.scss'
import { useSelector } from 'react-redux'

function GlobalLoading(props) {
	const theme = useSelector(state => state.setting.theme)
	return (
		<section className={style.global_loading}>
			<Loading.Line {...props} color={theme} />
		</section>
	)
}
export default GlobalLoading
