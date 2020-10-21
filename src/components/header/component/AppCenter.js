import React from 'react'
import style from '../style/index.module.scss'
import { Button, Popup } from 'sylas-react-ui'
import { AppsOutlined } from '@material-ui/icons'

export default function AppCenter() {
	const { popupRef, visible, handleShowPopup } = Popup.usePopupVisible()

	return (
		<Button.Icon className={style.btn} focus={visible} onClick={handleShowPopup}>
			<AppsOutlined />
			<Popup className={style.app_center} ref={popupRef} visible={visible} scaleOrigin="top-right">
				APP
			</Popup>
		</Button.Icon>
	)
}
