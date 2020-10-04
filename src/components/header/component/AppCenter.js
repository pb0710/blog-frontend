import React from 'react'
import style from '../style/index.module.scss'
import { Button, Popup } from 'sylas-react-ui'
import { AppstoreOutlined } from '@ant-design/icons'

export default function AppCenter(props) {
  const {} = props

  const { popupRef, visible, handleShowPopup } = Popup.usePopupVisible()

  return (
    <>
      <Button.Icon className={style.btn} focus={visible} onClick={handleShowPopup}>
        <AppstoreOutlined />
      </Button.Icon>
      <Popup className={style.app_center} ref={popupRef} visible={visible} scaleOrigin="top-right">
        user
      </Popup>
    </>
  )
}
