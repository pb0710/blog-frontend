import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Button } from 'sylas-react-ui'
import style from './style/index.module.scss'
import { FullScreenPage } from '@/components/page'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

export default function NotFound() {
	const history = useHistory()
	const theme = useSelector(state => state.setting.theme)
	const { t } = useTranslation()

	const handleGoback = () => {
		history.goBack()
	}

	return (
		<FullScreenPage className={style.not_found_page}>
			<div className={style.prompt}>
				<h1>{t('not_found.page_not_found')}</h1>
				<div className={style.operation}>
					<Button color={theme} light onClick={handleGoback}>
						{t('not_found.go_back')}
					</Button>
					<Link to="/">
						<Button color={theme}>{t('not_found.go_home')}</Button>
					</Link>
				</div>
			</div>
		</FullScreenPage>
	)
}
