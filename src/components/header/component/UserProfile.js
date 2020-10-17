import React from 'react'
import style from '../style/index.module.scss'
import { Button, Popup } from 'sylas-react-ui'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import * as commonAction from '@/store/actions'

export default function UserProfile() {
  const dispatch = useDispatch()
  const { avatar } = useSelector(state => state.userProfile)

  const { popupRef, visible, handleShowPopup } = Popup.usePopupVisible()

  const handleSignOut = () => {
    dispatch(commonAction.userLogout())
  }

  const avatarCls = clsx(style.user_avatar, visible && style.active)

  return (
    <>
      <div className={avatarCls} onClick={handleShowPopup}>
        <img src={avatar ?? 'default'} alt="avatar" />
      </div>
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
