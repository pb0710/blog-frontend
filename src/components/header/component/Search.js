import React from 'react'
import style from '../style/index.module.scss'
import { Button, Popup, Input, List } from 'sylas-react-ui'
import SearchIcon from 'mdi-react/SearchIcon'
import { useSelector } from 'react-redux'

export default function Search() {
	const theme = useSelector(state => state.setting.theme)
	const [visible, popupRef, { toggle }] = Popup.usePopup()
	return (
		<>
			<Button.Icon className={style.btn} focus={visible} onClick={toggle}>
				<SearchIcon size={20} />
			</Button.Icon>
			<Popup ref={popupRef} className={style.search} visible={visible} scaleOrigin="top">
				<Input color={theme} placeholder="文章检索" />
				<List>
					<List.Item>result 1</List.Item>
					<List.Item>result 2</List.Item>
					<List.Item>result 3</List.Item>
				</List>
			</Popup>
		</>
	)
}
