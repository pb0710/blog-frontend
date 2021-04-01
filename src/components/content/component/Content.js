import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { GlobalLoading } from '@/components/base'
import config from '@/config'

const navRoutes = [
	{
		path: '/',
		component: () => import('@/views/home/component/Home')
	},
	{
		path: '/article/:category/detail/:id',
		component: () => import('@/views/articleDetail/component/ArticleDetail')
	},
	{
		path: '/article/:category',
		component: () => import('@/views/articleCards/component/ArticleCards')
	},
	{
		path: '/upload',
		component: () => import('@/views/articleUpload/component/ArticleUpload')
	},
	{
		path: '/setting',
		component: () => import('@/views/settings/component/Setting')
	},
	{
		path: '/about',
		component: () => import('@/views/about/component/About')
	},
	{
		path: '/404',
		component: () => import('@/views/notFound/NotFound')
	}
]

function Content() {
	return (
		<React.Suspense fallback={<GlobalLoading />} maxDuration={config.LOADING_DELAY}>
			<Switch>
				{navRoutes.map(({ path, component, ...rest }) => (
					<Route key={path} exact path={path} component={React.lazy(component)} {...rest} />
				))}
				<Redirect to="/404" />
			</Switch>
		</React.Suspense>
	)
}

export default React.memo(Content)
