import React from 'react'
import style from '../style/index.module.scss'
import { Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { Panel, Affix } from '@/components/base'
import IndividualPanel from './IndividualPanel'
import AuthorPanel from './AuthorPanel'
import ArticleStatsPanel from './ArticleStatsPanel'

function RightSider() {
	const opened = useSelector(state => state.sider.drawerOpened)
	const rightSiderCls = clsx(style.right_sider, opened && style.narrowing)

	const rightSideRoutes = [
		{
			path: '',
			component: (
				<Affix>
					<IndividualPanel />
				</Affix>
			)
		},
		{
			path: '/upload',
			component: null
		},
		{
			path: '/setting',
			component: null
		},
		{
			path: '/article/:category',
			component: null
		},
		{
			path: '/article/:category/detail/:id',
			component: (
				<>
					<AuthorPanel />
					<Affix>
						<ArticleStatsPanel />
					</Affix>
				</>
			)
		}
	]

	return (
		<React.Suspense fallback="loading">
			<aside className={rightSiderCls}>
				<Switch>
					{rightSideRoutes.map(({ path, component, ...rest }) => (
						<Route key={path} exact path={`/blog${path}`} {...rest}>
							{component}
						</Route>
					))}
					<Route>
						<Panel></Panel>
						<Panel></Panel>
						<Affix>
							<Panel></Panel>
						</Affix>
					</Route>
				</Switch>
			</aside>
		</React.Suspense>
	)
}

export default React.memo(RightSider)
