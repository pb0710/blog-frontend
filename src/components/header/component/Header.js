import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'sylas-react-ui'
import { MenuOutlined } from '@ant-design/icons'
import style from '../style/index.module.scss'
import * as action from '@/components/sider/store/action'

export default function Header() {
  const dispatch = useDispatch()

  const handleToggleDrawer = () => {
    dispatch(action.updateDrawer(true))
  }

  return (
    <header className={style.header}>
      <Button.Icon className={style.drawerControl} onClick={handleToggleDrawer}>
        <MenuOutlined />
      </Button.Icon>
    </header>
  )
}
