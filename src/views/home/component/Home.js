import React from 'react'
import style from '../style/index.module.scss'
import { FlexiblePage } from '@/components/page'
import { Panel } from '@/components/base'
import { Tabs } from 'sylas-react-ui'
import { useSelector } from 'react-redux'
import ArticleList from './ArticleList'

export default function Home() {
	const theme = useSelector(state => state.setting.theme)
	const tabList = [
		{ key: 'latest', title: '最新发布' },
		{ key: 'popular', title: '热门' },
		{ key: 'random', title: '随便看看' }
	]

	return (
		<FlexiblePage className={style.home_page}>
			<article className={style.page_wrapper}>
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
