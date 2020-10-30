import React from 'react'
import style from '../style/index.module.scss'
import { Button, Popup } from 'sylas-react-ui'
import { SearchOutlined } from '@material-ui/icons'

export default function Search() {
	const { ref, visible, show } = Popup.usePopup()

	return (
		<Button.Icon className={style.btn} focus={visible} onClick={show}>
			<SearchOutlined />
			<Popup className={style.search} ref={ref} visible={visible} scaleOrigin="top-right">
				search
			</Popup>
		</Button.Icon>
	)
}
