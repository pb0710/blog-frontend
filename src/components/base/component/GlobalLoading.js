import React from 'react'
import { Loading } from 'sylas-react-ui'
import style from '../style/index.module.scss'

function GlobalLoading(props) {
	return (
		<section className={style.global_loading}>
			<Loading.Line {...props} />
		</section>
	)
}
export default GlobalLoading
