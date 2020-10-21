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
    <Switch>
      <Route exact path="/upload" />
      <Route exact path="/detail/:id">
        <aside className={rightSiderCls}>
          <AuthorCard />
          <Affix>
            <Panel></Panel>
          </Affix>
        </aside>
      </Route>
      <Route>
        <aside className={rightSiderCls}>
          <Panel></Panel>
          <Panel></Panel>
          <Affix>
            <Panel></Panel>
          </Affix>
        </aside>
      </Route>
    </Switch>
  )
}