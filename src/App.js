import React from 'react'
import style from '@/assets/styles/layout.module.scss'
import { Header } from '@/components/header'
import { Sider } from '@/components/sider'
import { RightSider } from '@/components/rightSider'
import { Content } from '@/components/content'
import { Modal } from '@/components/modal'
import { useSelector } from 'react-redux'

export default function App() {
  const { visible } = useSelector(state => state.modal)
  return (
    <div className={style.app}>
      {visible && <Modal />}
      <Header />
      <Sider />
      <Content />
      <RightSider />
    </div>
  )
}
