import React from 'react'
import style from './index.module.scss'
import { Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { Panel, Affix } from '@/components/base'
import { AuthorCard } from '@/components/author'

export default function RightSider() {
  const { drawerOpened } = useSelector(state => state.sider)
  const rightSiderCls = clsx([style.right_sider, drawerOpened && style.narrowing])
  return (
    <aside className={rightSiderCls}>
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
    </aside>
  )
}
