import React from 'react'
import style from '../style/index.module.scss'
import { FlexiblePage } from '@/components/page'
import { Panel } from '@/components/base'
import { Tabs } from 'sylas-react-ui'
import { useSelector } from 'react-redux'
import ArticleList from './ArticleList'
import { useTranslation } from 'react-i18next'

export default function Home() {
	const { t } = useTranslation()
	const theme = useSelector(state => state.setting.theme)

	const tabList = [
		{ key: 'latest', title: t('home.latest') },
		{ key: 'popular', title: t('home.popular') },
		{ key: 'random', title: t('home.random') }
	]

	return (
		<FlexiblePage className={style.home_page}>
			<article className={style.home_wrapper}>
				<Panel>
					<Tabs bordered={false} color={theme} activeKey="latest">
						{tabList.map(({ key, title }) => (
							<Tabs.Panel key={key} tabKey={key} title={title}>
								<ArticleList sortBy={key} />
							</Tabs.Panel>
						))}
					</Tabs>
				</Panel>
			</article>
		</FlexiblePage>
	)
}
