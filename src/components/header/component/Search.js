import React from 'react'
import style from '../style/index.module.scss'
import { Button, Popup } from 'sylas-react-ui'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'

export default function Search(props) {
	const { popupRef, visible, handleShowPopup } = Popup.usePopupVisible()

	return (
		<>
			<Button.Icon className={style.btn} focus={visible} onClick={handleShowPopup}>
				<SearchOutlinedIcon />
			</Button.Icon>
			<Popup className={style.search} ref={popupRef} visible={visible} scaleOrigin="top-right">
				search
			</Popup>
		</>
	)
}
