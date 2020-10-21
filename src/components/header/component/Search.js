import React from 'react'
import style from '../style/index.module.scss'
import { Button, Popup } from 'sylas-react-ui'
import { SearchOutlined } from '@material-ui/icons'

export default function Search() {
	const { popupRef, visible, handleShowPopup } = Popup.usePopupVisible()

	return (
		<Button.Icon className={style.btn} focus={visible} onClick={handleShowPopup}>
			<SearchOutlined />
			<Popup className={style.search} ref={popupRef} visible={visible} scaleOrigin="top-right">
				search
			</Popup>
		</Button.Icon>
	)
}
