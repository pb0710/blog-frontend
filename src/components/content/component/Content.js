import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '@/views/home/Home'
import NotFound from '@/views/notFound/NotFound'
import { useSelector } from 'react-redux'
import { GlobalLoading } from '@/components/base'

function Content() {
	const theme = useSelector(state => state.setting.theme)
	return (
		<React.Suspense fallback={<GlobalLoading color={theme} />}>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/articles/:sort" component={React.lazy(() => import('@/views/articleList/ArticleList'))} />
				<Route
					exact
					path="/articles/:sort/detail/:id"
					component={React.lazy(() => import('@/views/articleDetail/component/ArticleDetail'))}
				/>
				<Route
					exact
					path="/upload"
					component={React.lazy(() => import('@/views/articleUpload/component/ArticleUpload'))}
				/>
				<Route exact path="/setting" component={React.lazy(() => import('@/views/settings/component/Setting'))} />
				<Route component={NotFound} />
			</Switch>
		</React.Suspense>
	)
}

export default React.memo(Content)
