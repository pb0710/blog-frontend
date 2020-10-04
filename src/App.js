import React from 'react'
import style from '@/assets/styles/layout.module.scss'
import { Switch, Route } from 'react-router-dom'
import { Loading } from 'sylas-react-ui'
import { Header } from '@/components/header'
import { Sider } from '@/components/sider'
import { RightSider } from '@/components/rightSider'
import Home from '@/pages/home/Home'
import NotFound from '@/pages/notFound/NotFound'
import { Panel, Affix } from '@/components/base'
import { AuthorCard } from '@/components/author'
import { Modal } from '@/components/modal'
import { useSelector } from 'react-redux'

export default function App() {
  const { visible } = useSelector(state => state.modal)
  return (
    <div className={style.app}>
      {visible && <Modal />}
      <Header />
      <Sider />
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
      <RightSider>
        <Switch>
          <Route exact path="/upload" />
          <Route exact path="/detail/:id">
            <AuthorCard />
          </Route>
          <Route>
            <Panel></Panel>
            <Panel></Panel>
            <Affix>
              <Panel></Panel>
            </Affix>
          </Route>
        </Switch>
      </RightSider>
    </div>
  )
}
