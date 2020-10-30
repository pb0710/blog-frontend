import React from 'react'
import style from '../style/index.module.scss'
import { NotificationsOutlined } from '@material-ui/icons'
import { Popup, Button } from 'sylas-react-ui'

export default function Notification() {
	const { ref, visible, show } = Popup.usePopup()

	return (
		<Button.Icon className={style.btn} focus={visible} onClick={show}>
			<NotificationsOutlined />
			<Popup className={style.notification} ref={ref} visible={visible} scaleOrigin="top-right">
				notification
			</Popup>
		</Button.Icon>
	)
}
