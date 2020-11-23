import React from 'react'
import style from '../style/index.module.scss'
import { Button, Popup, Input, List } from 'sylas-react-ui'
import SearchIcon from 'mdi-react/SearchIcon'
import { useSelector } from 'react-redux'

export default function Search() {
	const theme = useSelector(state => state.setting.theme)
	const { ref, visible, show } = Popup.usePopup()

	return (
		<Button.Icon className={style.btn} focus={visible} onClick={show}>
			<SearchIcon size={20} />
			<Popup className={style.search} ref={ref} visible={visible} scaleOrigin="top-right">
				<Input color={theme} placeholder="搜索" />
				<List>
					<List.Item>result 1</List.Item>
					<List.Item>result 2</List.Item>
					<List.Item>result 3</List.Item>
				</List>
			</Popup>
		</Button.Icon>
	)
}
