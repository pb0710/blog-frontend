import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'sylas-react-ui'
import { MenuOutlined, SearchOutlined, AppstoreOutlined, UserOutlined } from '@ant-design/icons'
import style from '../style/index.module.scss'
import * as commonAction from '@/store/actions'
import * as action from '@/components/sider/store/action'
import * as modalAction from '@/components/modal/store/action'
import * as userApi from '@/apis/user'
import AppCenter from './AppCenter'
import UserProfile from './UserProfile'

export default function Header() {
  const dispatch = useDispatch()
  const { online } = useSelector(state => state)

  const handleToggleDrawer = () => {
    dispatch(action.updateDrawer(true))
  }

  const handleGoLogin = () => {
    dispatch(modalAction.updateModalVisible(true))
  }

  React.useEffect(() => {
    dispatch(commonAction.initUser())
  }, [])

  return (
    <header className={style.header}>
      <Button.Icon className={style.drawerControl} onClick={handleToggleDrawer}>
        <MenuOutlined />
      </Button.Icon>
      <div className={style.tool_bar}>
        <Button.Icon className={style.btn}>
          <SearchOutlined />
        </Button.Icon>
        <AppCenter />
        {online ? (
          <UserProfile />
        ) : (
          <Button className={style.btn} color="primary" onClick={handleGoLogin}>
            登录
          </Button>
        )}
      </div>
    </header>
  )
}
