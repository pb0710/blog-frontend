import React from 'react'
import style from '../style/index.module.scss'
import { Button, Popup } from 'sylas-react-ui'
import { SearchOutlined } from '@ant-design/icons'

export default function Search(props) {
  const {} = props

  const { popupRef, visible, handleShowPopup } = Popup.usePopupVisible()

  return (
    <>
      <Button.Icon className={style.btn} focus={visible} onClick={handleShowPopup}>
        <SearchOutlined />
      </Button.Icon>
      <Popup className={style.search} ref={popupRef} visible={visible} scaleOrigin="top-right">
        search
      </Popup>
    </>
  )
}
