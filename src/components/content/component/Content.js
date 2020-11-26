import React from 'react'
import style from '../style/index.module.scss'
import { Switch, Route } from 'react-router-dom'
import Home from '@/views/home/Home'
import NotFound from '@/views/notFound/NotFound'
import { Loading } from 'sylas-react-ui'
import { useSelector } from 'react-redux'

function Content() {
	const theme = useSelector(state => state.setting.theme)
	return (
		<React.Suspense
			fallback={(() => (
				<section className={style.loading_wrapper}>
					<Loading.Line color={theme} />
				</section>
			))()}
		>
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
