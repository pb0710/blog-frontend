import React from 'react'
import style from '../style/index.module.scss'
import { Button, Popup, Select } from 'sylas-react-ui'
import AppsIcon from 'mdi-react/AppsIcon'

export default function AppCenter() {
	const { ref, visible, show } = Popup.usePopup()

	return (
		<Button.Icon className={style.btn} focus={visible} onClick={show}>
			<AppsIcon size={20} />
			<Popup className={style.app_center} ref={ref} visible={visible} scaleOrigin="top-right">
				APP
				<Select>
					<Select.Option value="primary">蔚蓝</Select.Option>
					<Select.Option value="success">葱绿</Select.Option>
					<Select.Option value="warning">金黄</Select.Option>
					<Select.Option value="error">粉红</Select.Option>
				</Select>
			</Popup>
		</Button.Icon>
	)
}
