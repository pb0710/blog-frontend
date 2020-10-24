import React from 'react'
import style from '../style/index.module.scss'
import { Switch, Route } from 'react-router-dom'
import Home from '@/pages/home/Home'
import NotFound from '@/pages/notFound/NotFound'
import { Loading } from 'sylas-react-ui'

function Content() {
	return (
		<React.Suspense
			fallback={(() => (
				<div className={style.loading_wrapper}>
					<Loading.Line />
				</div>
			))()}
		>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/articles/:sort" component={React.lazy(() => import('@/pages/articleList/ArticleList'))} />
				<Route exact path="/detail/:id" component={React.lazy(() => import('@/pages/articleDetail/ArticleDetail'))} />
				<Route
					exact
					path="/upload"
					component={React.lazy(() => import('@/pages/articleUpload/component/ArticleUpload'))}
				/>
				<Route component={NotFound} />
			</Switch>
		</React.Suspense>
	)
}

export default React.memo(Content)
