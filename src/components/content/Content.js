import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '@/pages/home/Home'
import NotFound from '@/pages/notFound/NotFound'
import { Loading } from 'sylas-react-ui'

function Content() {
  return (
    <React.Suspense fallback={<Loading.Bounce />}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/articles/:sort"
          component={React.lazy(() => import('@/pages/articleList/ArticleList'))}
        />
        <Route
          exact
          path="/detail/:id"
          component={React.lazy(() => import('@/pages/articleDetail/ArticleDetail'))}
        />
        <Route
          exact
          path="/upload"
          component={React.lazy(() => import('@/pages/articleUpload/ArticleUpload'))}
        />
        <Route component={NotFound} />
      </Switch>
    </React.Suspense>
  )
}

export default React.memo(Content)
