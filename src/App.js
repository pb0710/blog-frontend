import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { Loading } from 'sylas-react-ui'
import { Header } from '@/components/header'
import Sider from './components/sider/component/Sider'

function App() {
  return (
    <div>
      <Header />
      <Sider />
      <React.Suspense fallback={<Loading.Bounce />}>
        <Switch>
          <Route exact path="/" component={null} />
          <Route
            path="/upload"
            component={React.lazy(() => import('@/pages/articleUpload/ArticleUpload'))}
          />
        </Switch>
      </React.Suspense>
    </div>
  )
}

export default App
