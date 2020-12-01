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
					path="/article/:category/detail/:id"
					component={React.lazy(() => import('@/views/articleDetail/component/ArticleDetail'))}
				/>
				<Route
					exact
					path="/article/:category"
					component={React.lazy(() => import('@/views/articleCards/component/ArticleCards'))}
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
