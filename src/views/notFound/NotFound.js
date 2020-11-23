import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Button } from 'sylas-react-ui'
import style from './style/index.module.scss'
import { FullScreenPage } from '@/components/page'
import { useSelector } from 'react-redux'

export default function NotFound() {
	const history = useHistory()
	const theme = useSelector(state => state.setting.theme)

	const handleGoback = () => {
		history.goBack()
	}

	return (
		<FullScreenPage className={style.not_found_page}>
			<div className={style.prompt}>
				<h1>页面找不到啦...</h1>

				<div className={style.operation}>
					<Button color={theme} light onClick={handleGoback}>
						后退
					</Button>
					<Link to="/">
						<Button color={theme}>返回首页</Button>
					</Link>
				</div>
			</div>
		</FullScreenPage>
	)
}
