import React from 'react'
import style from '../style/index.module.scss'
import { NotificationsOutlined } from '@material-ui/icons'
import { Popup, Button } from 'sylas-react-ui'

export default function Notification() {
	const { popupRef, visible, handleShowPopup } = Popup.usePopupVisible()

	return (
		<Button.Icon className={style.btn} focus={visible} onClick={handleShowPopup}>
			<NotificationsOutlined />
			<Popup className={style.notification} ref={popupRef} visible={visible} scaleOrigin="top-right">
				notification
			</Popup>
		</Button.Icon>
	)
}
