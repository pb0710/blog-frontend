import React from 'react'
import style from '../style/index.module.scss'
import { Button, Popup } from 'sylas-react-ui'
import { UserOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import * as commonAction from '@/store/actions'
import * as userApi from '@/apis/user'

export default function UserProfile(props) {
  const {} = props
  const dispatch = useDispatch()

  const { popupRef, visible, handleShowPopup } = Popup.usePopupVisible()

  const handleSignOut = () => {
    dispatch(commonAction.userLogout())
  }

  return (
    <>
      <Button.Icon className={style.btn} focus={visible} onClick={handleShowPopup}>
        <UserOutlined />
      </Button.Icon>
      <Popup
        className={style.user_profile}
        ref={popupRef}
        visible={visible}
        scaleOrigin="top-right"
      >
        <Button onClick={handleSignOut}>退出</Button>
      </Popup>
    </>
  )
}
