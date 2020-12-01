import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '@/views/home/component/Home'
import { GlobalLoading } from '@/components/base'

function Content() {
	return (
		<React.Suspense fallback={<GlobalLoading />}>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route
					exact
					path="/articles/:sort/detail/:id"
					component={React.lazy(() => import('@/views/articleDetail/component/ArticleDetail'))}
				/>
				<Route
					exact
					path="/articles/:sort"
					component={React.lazy(() => import('@/views/articleList/component/ArticleList'))}
				/>
				<Route
					exact
					path="/upload"
					component={React.lazy(() => import('@/views/articleUpload/component/ArticleUpload'))}
				/>
				<Route exact path="/setting" component={React.lazy(() => import('@/views/settings/component/Setting'))} />
				<Route component={React.lazy(() => import('@/views/notFound/NotFound'))} />
			</Switch>
		</React.Suspense>
	)
}

export default React.memo(Content)
