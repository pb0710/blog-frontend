import React from 'react'
import style from './index.module.scss'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

export default function RightSider(props) {
  const { children } = props
  const { drawerOpened } = useSelector(state => state.sider)
  const rightSiderCls = clsx([style.right_sider, drawerOpened && style.narrowing])
  return <aside className={rightSiderCls}>{children}</aside>
}
